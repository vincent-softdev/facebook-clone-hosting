const Personal = ({icons}) => {
    const imageSrc = "https://scontent.fmel15-1.fna.fbcdn.net/v/t39.30808-1/453235400_3817583518466333_2745631905922420128_n.jpg?stp=dst-jpg_s480x480&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=kdr6Cb2VfX4Q7kNvgGa-s3h&_nc_ht=scontent.fmel15-1.fna&_nc_gid=A-9bSYO8G-NaVqGOzwOY736&oh=00_AYA9iNCD9W_H_F9P5zwGzJtoL2S1ugz3WyJfd0M70KXLEA&oe=6705CB23"
    
    return (
        <ul className="flex gap-2">
            {
                icons.map((item, index) => (
                    <li key={index} className="cursor-pointer ">
                        <item.icon className={`h-12 w-12 p-2 rounded-full bg-gray-200 hover:bg-gray-300`}/>
                    </li>
                ))
            }
            <li
                style={{backgroundImage: `url(${imageSrc})`}}
                className="h-12 w-12 p-2 rounded-full bg-gray-200 bg-cover bg-center bg-no-repeat cursor-pointer hover:opacity-80 active:opacity-60"
            />
        </ul>
    );
}

export default Personal
