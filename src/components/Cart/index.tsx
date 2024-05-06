interface taskInterface {
    id: string,
    title: string,
    description?: string,
    isFavorite: boolean,
    colorBackground: string,
    userId: string
}

interface cartProps {
    task: taskInterface
}

export function Cart({task}: cartProps) {
    const {id,title,description,isFavorite,colorBackground,userId} = task;
    
    const pathIconFavorite = isFavorite? "/icons/star_marked.svg": "/icons/star.svg"
    return ( 
        <div className="bg-blue-300 min-h-56 p-2">
            <div className="flex justify-between">
                <p>{title}</p>
                <div className="flex">
                    <img src="/icons/trash.svg" alt="" />
                    <img src="/icons/edit.svg" alt="" />
                    <img src="/icons/pallete.svg" alt="" />
                    <img src={pathIconFavorite} alt="" />
                </div>
            </div>
            <div>
                <p className="break-words">
                    {description}
                </p>
            </div>
        </div>
     );
}