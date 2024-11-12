'use client'

import { Icons } from "@/icons/icons";
import { IconImages } from "@/icons/icon_images";
import { useState, useRef, useEffect } from "react";
import { db, storage } from "@/app/firebase"; // Your updated firebase.js file
import { addDoc, collection, doc, updateDoc  } from "firebase/firestore"; // Import Firestore functions
import { serverTimestamp } from "firebase/firestore"; // Import Firestore's serverTimestamp
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Spinner from "../spinner/spinner";
import { user } from "@/constants/data";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { postBackgroundColor } from "@/constants/data_color";

const CreatePostModal = ({ closeModal }) => {
    const [text, setText] = useState("");
    const [postActivated, setPostActivated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageActivated, setImageActivated] = useState(false);
    const [textLine, setTextLine] = useState(0);
    const [fontSize, setFontSize] = useState(30); // Initial font size
    const textAreaRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState(null)
    const [colorList, setColorList] = useState(true);
    const [textareaColor, setTextAreaColor] = useState("#ffffff")

    // set color for textarea
    const activateTextAreaColor = (color) => {
        console.log('text area color: ' + color)
        setTextAreaColor(color)
    }

    // activate the image
    const activateImage = () => {
        if (imageActivated) {
            setImageToPost(null); // Clear the image if already activated
        }
        setImageActivated((prev) => !prev);
    };

    // This will use to activate the color
    const activateColorList = () => {
        // console.log('hello')
        setColorList((prev) => !prev);
    }

    // Function to adjust font size and modal height based on input height
    const adjustSize = () => {
        if (textAreaRef.current) {
            // Split the textarea value by newlines and count wrapped lines
            const lines = text.split("\n").reduce((totalLines, line) => {
                const lineLength = line.length;
                const charsPerLine = Math.floor(textAreaRef.current.clientWidth / (fontSize * 0.6)); // Estimate characters per line based on font size
                const wrappedLines = Math.ceil(lineLength / charsPerLine);
                return totalLines + wrappedLines;
            }, 0);

            setTextLine(lines);
            setFontSize(lines <= 3 ? 30 : (lines > 1 && lines <= 5) ? 24 : 16);
        }
    };

    useEffect(() => {
        adjustSize(); // Adjust size whenever the text changes

        // Enable "Post" button only when text is not empty
        setPostActivated(text.trim().length > 0);
    }, [text]);

    // We will handle one image first
    const addImageToPost = (e) => {
        const reader = new FileReader()

        if (e.target.files && e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
    }

    // send post detail to server
    const sendPost = async (e) => {
        e.preventDefault();
        
        if (!textAreaRef.current.value) return;
        setLoading(true); // Start loading spinner
    
        // Add post to Firestore
        const docRef = await addDoc(collection(db, 'posts'), {
            name: user.name,
            email: user.email,
            content: textAreaRef.current.value,
            date: serverTimestamp(),
            image: user.image
        });
    
        if (imageToPost) {
            const imageRef = ref(storage, `posts/${docRef.id}`);  // Create a reference in Firebase Storage
    
            // Upload image as a base64 string
            await uploadString(imageRef, imageToPost, 'data_url').catch(error => {
                console.error('Error uploading image:', error);
            });
    
            // Get the download URL
            const url = await getDownloadURL(imageRef);
    
            // Update Firestore document with the image URL
            await updateDoc(doc(db, 'posts', docRef.id), {
                postImage: url
            });
        }
    
        // textAreaRef.current.value = "";
        closeModal();
        setLoading(false)
    };

    return (
        <div className="text-black fixed inset-0 py-14 px-6 z-50 flex items-center justify-center">
            {/* Modal background */}
            <div>
                <div
                    className="absolute inset-0 bg-gray-200 opacity-70"
                    onClick={closeModal}
                />
            </div>
            {/* Modal content */}
            <div
                className="relative z-10 flex flex-col flex-grow bg-white py-4 rounded-lg shadow-lg max-w-lg w-full h-fit"
                style={{ height: `fit-content`, maxHeight: "90vh", overflow: "hidden" }} // Dynamically set modal height
            >
                {/* Close button */}
                <div className="block">
                    <div className="flex justify-center pb-4 w-full">
                        <p className="font-bold text-[1.25rem]">Create post</p>
                    </div>
                    <button
                        className="absolute flex justify-center rounded-full items-center top-2 pl-1 pt-1 w-9 h-9 bg-[#e4e6eb] right-2 text-gray-500"
                        onClick={closeModal}
                    >
                        <IconImages.Close className="w-6 h-6 opacity-45" />
                    </button>
                </div>
                <hr className="border-none h-[1px] bg-gray-200" />
                <div className="py-4 pb-0 model_content">
                    <div class="content_user-detail flex flex-row px-4 mb-4">
                        <div
                            style={{ backgroundImage: `url(${user.image})` }}
                            className="inline-block h-[52px] w-[52px] p-2 rounded-full bg-gray-200 bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-80 active:opacity-60"
                        ></div>
                        <div className="inline-block ml-3">
                            <p className="font-semibold">{user.name}</p>
                            <p className="flex items-center gap-1 font-semibold text-[13px] bg-gray-200 py-1 px-2 rounded-lg">
                                <Icons.FriendIcon className="w-3 h-3" type="solid" />
                                <span>Friends</span>
                                <i
                                    style={{
                                        backgroundImage: `url(https://static.xx.fbcdn.net/rsrc.php/v3/yV/r/D15K5HtLH2o.png)`,
                                        backgroundPosition: `0px -822px`,
                                        backgroundSize: `25px 835px`,
                                    }}
                                    className="w-3 h-3 bg-no-repeat inline-block"
                                ></i>
                            </p>
                        </div>
                    </div>
                    {/* Spinner or Textarea */}
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <Spinner /> {/* Display spinner while loading */}
                        </div>
                    ) : (
                        <>
                            <div 
                                className="pl-4 max-h-[45vh] w-full overflow-y-scroll"
                                style={{
                                    paddingLeft: "1rem",
                                    paddingBottom: "1rem",
                                    backgroundColor: textareaColor != "#ffffff" && textLine < 4 ? textareaColor : "white",
                                }}
                            >
                                <textarea
                                    ref={textAreaRef}
                                    className={`w-full h-full mt-3 p-2 overflow-hidden bg-transparent min-h-[100px] border-none outline-none resize-none`}
                                    rows={2}
                                    placeholder="What's on your mind?"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    style={{
                                        fontSize: `${fontSize}px`,
                                        lineHeight: "1.2",
                                        textAlign: textareaColor != "#ffffff" && textLine < 4 ? "center" : "start",
                                        color: textareaColor != "#ffffff" && textLine < 4 ? "white" : "black",
                                        height: `${textLine * fontSize + 20 + ((textLine * fontSize) > 270 ? (textLine * fontSize) > 300 ? 50 : 45 : 30)}px`,
                                    }} // Adjust textarea styles
                                />
                                <div className={`h-[40px] flex items-center ${!(textLine < 4 && !imageActivated) ? "justify-end" : "justify-between"} `}>
                                    {(textLine < 4 && !imageActivated) && colorList && <button className="h-10" onClick={activateColorList}><IconImages.ColorfulTextIcon className="h-full cursor-pointer" /></button>}
                                    {
                                        !colorList && textLine < 4 && 
                                        <div className="flex gap-2">
                                            <button onClick={activateColorList} className="bg-[#c9ccd1] w-9 h-9 pr-1 rounded-lg flex justify-center items-center">
                                                <ArrowBackIosNewIcon />
                                            </button>
                                            {
                                                postBackgroundColor.map((item, idx) => {
                                                    return (
                                                        <button key={idx} onClick={() => activateTextAreaColor(item.color)} className="w-9 h-9 rounded-lg" 
                                                            style={{
                                                                backgroundColor: (item.color == textareaColor && item.color == "#ffffff") ? "#f2f4f7" : item.color,
                                                                border: item.color == textareaColor ? "2px solid #fff" : "none",
                                                                boxShadow: item.color == textareaColor ? "0px 0px 2px 0px": "none"
                                                                }}>
                                                        </button>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                    <IconImages.SmillingEmogi className="w-6 h-7 opacity-70" />
                                </div>
                                {
                                    (imageActivated) && (
                                        <div className="max-w-xl mb-4 relative">
                                            <button
                                                        className="absolute flex justify-center rounded-full items-center top-2 pt-[2px] mt-2 mr-2 pl-[3px] w-7 h-7 border-[1px] border-gray-300 hover:bg-[#e4e6eb] bg-white right-2 text-gray-500"
                                                        onClick={activateImage}
                                                >
                                                    <IconImages.Close className="w-6 h-6 scale-75" />
                                                </button>
                                            {
                                                imageToPost == null && (
                                                    <label
                                                        className="flex justify-center w-full h-32 p-2 border-[1px] transition bg-white border-gray-300 rounded-md appearance-none cursor-pointer focus:outline-none">
                                                        
                                                        <span className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 w-full rounded-md">
                                                            <span className="flex flex-col items-center w-full">
                                                                <span className="bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center">
                                                                    <IconImages.AddImageIcon className="w-5 h-5 "/>
                                                                </span>
                                                                <span className="text-black font-medium text-[1.0625rem]">Add Photos/Videos</span>
                                                                <span className="text-[.8rem] text-gray-500">or drag and drop</span>
                                                            </span>
                                                        </span>
                                                        <input type="file" ref={filepickerRef} name="file_upload" className="hidden" onChange={addImageToPost}/>
                                                    </label>
                                                )
                                            }
                                            {
                                                imageToPost && (
                                                    <label
                                                        className="flex justify-center w-full h-32 p-2 border-[1px] transition bg-white border-gray-300 rounded-md appearance-none cursor-pointer focus:outline-none">
                                                        
                                                        <div className="flex justify-center w-full bg-gray-100 rounded-md">
                                                            <img src={imageToPost} alt="image" />
                                                        </div>
                                                    </label>
                                                    
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>

                            <div className="h-[60px] mx-4 flex border-gray-300 rounded-md border-[1px] px-4 font-semibold justify-between">
                                    <div className="h-full flex items-center">
                                        Add to your post
                                    </div>
                                    <div id="function-icon-cover" className="h-full flex items-center gap-4">
                                        <button onClick={activateImage}>
                                            <IconImages.ImageIcon className="w-6 h-6 cursor-pointer" />
                                        </button>
                                        
                                        <IconImages.TagPeopleIcon className="w-6 h-6" />
                                        <IconImages.AddEmotionIcon className="w-6 h-6" />
                                        <IconImages.AddLocationTagIcon className="w-6 h-6" />
                                        <IconImages.ListMoreIcon className="w-6 h-6" />
                                    </div>
                                </div>
                            <div className="px-4">
                                <button
                                    className={`w-full mt-3 py-[6px] p-1 px-3 rounded-md font-semibold ${
                                        postActivated
                                            ? "bg-blue-600 text-white opacity-100 cursor-pointer"
                                            : "bg-gray-400 opacity-30 cursor-not-allowed"
                                    }`}
                                    disabled={!postActivated}
                                    onClick={sendPost}
                                >
                                    {loading ? 'Posting...' : 'Post'}
                                </button>
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
