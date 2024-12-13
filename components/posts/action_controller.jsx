import { Icons } from "@/icons/icons";
import { IconImages } from "@/icons/icon_images";
import { checkLike, toggleLike } from "@/hooks/actions/like.hooks";
import ReactionButton from "../buttons/reaction_button";

const ActionController = ({ postId, userId }) => {
  const { isLiked } = checkLike(postId, userId);

  const handleLikeClick = async () => {
    await toggleLike(postId, userId);
  };

  return (
    <div className="reaction-action gap-1 flex font-semibold py-2 px-4 text-gray-500">
      <ReactionButton
        icon={
          <Icons.LikeIcon
            className={`h-6 ${isLiked ? "text-blue-500 " : ""}`}
          />
        }
        label="Like"
        like={isLiked}
        onClick={handleLikeClick}
      />
      <div className="grow flex cursor-pointer py-1 hover:bg-gray-100 rounded-md justify-center gap-2 items-center">
        <IconImages.CommentIcon className="h-6 w-6 opacity-60" />
        <p>Comment</p>
      </div>
      <div className="grow flex cursor-pointer py-1 hover:bg-gray-100 rounded-md justify-center gap-2 items-center">
        <IconImages.SendIcon className="h-6 w-6 opacity-60" />
        <p>Send</p>
      </div>
      <div className="grow flex cursor-pointer py-1 hover:bg-gray-100 rounded-md justify-center gap-2 items-center">
        <IconImages.ShareIcon className="h-6 w-6 opacity-60" />
        <p>Share</p>
      </div>
    </div>
  );
};

export default ActionController;
