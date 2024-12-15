import { IconImages } from "@/icons/icon_images";

const CustomModal = ({ children, closeModal, title }) => {
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
          <div className="flex justify-center pb-[6px] w-full">
            <p className="font-bold text-[1.25rem]">{title}</p>
          </div>
          <button
            className="absolute flex justify-center rounded-full items-center top-2 pl-1 pt-1 w-9 h-9 bg-[#e4e6eb] right-2 text-gray-500"
            onClick={closeModal}
          >
            <IconImages.Close className="w-6 h-6 opacity-45" />
          </button>
        </div>
        <hr className="border-none h-[1px] bg-gray-200" />
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
