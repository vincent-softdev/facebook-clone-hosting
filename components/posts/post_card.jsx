"use client";
import { DateFormating } from "@/utils/date.format";
import React, { createContext, forwardRef, useContext, useState } from "react";
import { user } from "@/constants/data";
import { Icons } from "@/icons/icons";
import { IconImages } from "@/icons/icon_images";
import { checkLike, toggleLike } from "@/hooks/actions/like.hooks";
import ReactionButton from "@/components/buttons/reaction_button";
import PostDetailModal from "@/views/modal/post_detail_modal";

const PostCardContext = createContext();

const usePostCardContext = () => {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error("PostCardContext must be used within a PostCard");
  }
  return context;
};

// Main PostCard Component
const PostCard = forwardRef(({ post, children }, ref) => {
  const { likeCount } = checkLike(post.id, user.id);

  return (
    <PostCardContext.Provider value={{ post, likeCount }}>
      <div
        ref={ref}
        className="post-card bg-white rounded-md shadow-md text-black"
      >
        {children}
      </div>
    </PostCardContext.Provider>
  );
});

export default PostCard;

PostCard.Header = function PostCardHeader() {
  const { post } = usePostCardContext();
  const formattedDate = DateFormating(post.date);

  return (
    <div className="card__header px-3 pt-3 flex justify-between">
      <div className="flex">
        <div className="post-header--left mb-4 flex h-10">
          <div className="left__image">
            <img
              src={post.image}
              alt="Post image"
              className="h-full w-10 rounded-full mr-2"
            />
          </div>
          <div className="mr-2">
            <div className="font-semibold">{post.name}</div>
            <div className="flex items-center h-4">
              <div className="text-sm text-gray-500">{formattedDate}</div>
              {/* <div className="mx-1 text-sm pb-2">.</div>
              <div className="text-sm text-gray-600">{post.email}</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="post-header--right flex h-full">
        <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
          <Icons.MoreIcon className="w-6" />
        </div>
        <div className="p-2 hover:bg-gray-200 rounded-full cursor-pointer">
          <Icons.CloseIcon className="w-6" />
        </div>
      </div>
    </div>
  );
};

PostCard.Content = function PostCardContent() {
  const { post } = usePostCardContext();

  return (
    <div className="card__content">
      {post.content && (
        <div className="content-text px-4 pb-4">
          <p>{post.content}</p>
        </div>
      )}
      {post.postImage && (
        <div className="content-image w-full">
          <img src={post.postImage} alt="Post Image" className="w-full" />
        </div>
      )}
    </div>
  );
};

PostCard.Footer = function PostCardFooter({ children }) {
  const { likeCount } = usePostCardContext();

  return (
    <div className="card__footer">
      <div className="reaction-calculator flex justify-between px-4 py-3">
        <div className="reaction-left flex gap-6">
          <div className="reaction-types">
            <div className="types-like flex w-[24px] h-[24px]">
              <IconImages.LikeIcon className="border-white rounded-full relative border-[2px] z-10" />
              <IconImages.LoveIcon className="border-white relative rounded-full border-[2px] left-[-5px]" />
            </div>
          </div>
          <div className="reaction-amount text-gray-500">
            <p>{likeCount}</p>
          </div>
        </div>
        <div className="reaction-right flex gap-4 text-gray-500">
          <div className="total-comment">
            <p>12 comments</p>
          </div>
          <div className="total-share">
            <p>12 shares</p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <hr />
      </div>
      {children}
    </div>
  );
};

PostCard.Footer.Actions = function PostCardFooterActions({ children }) {
  return (
    <div className="reaction-action gap-1 flex font-semibold py-2 px-4 text-gray-500">
      {children}
    </div>
  );
};

PostCard.Footer.Actions.Like = function PostCardFooterActionsLike() {
  const { post } = usePostCardContext();
  const { isLiked } = checkLike(post.id, user.id);

  const handleLikeClick = async () => {
    await toggleLike(post.id, user.id);
  };

  return (
    <ReactionButton
      icon={
        <Icons.LikeIcon className={`h-6 ${isLiked ? "text-blue-500 " : ""}`} />
      }
      label="Like"
      like={isLiked}
      onClick={handleLikeClick}
    />
  );
};

PostCard.Footer.Actions.Comment = function PostCardFooterActionsComment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="grow flex cursor-pointer py-1 hover:bg-gray-100 rounded-md justify-center gap-2 items-center"
        onClick={openModal}
      >
        <IconImages.CommentIcon className="h-6 w-6 opacity-60" />
        <p>Comment</p>
      </div>
      {isModalOpen && (
        <PostDetailModal
          closeModal={closeModal}
          title={`${user.name}'s Post`}
        />
      )}
    </>
  );
};

PostCard.Footer.Actions.Send = function PostCardFooterActionsSend() {
  return (
    <div className="grow flex cursor-pointer py-1 hover:bg-gray-100 rounded-md justify-center gap-2 items-center">
      <IconImages.SendIcon className="h-6 w-6 opacity-60" />
      <p>Send</p>
    </div>
  );
};

PostCard.Footer.Actions.Share = function PostCardFooterActionsShare() {
  return (
    <div className="grow flex cursor-pointer py-1 hover:bg-gray-100 rounded-md justify-center gap-2 items-center">
      <IconImages.ShareIcon className="h-6 w-6 opacity-60" />
      <p>Share</p>
    </div>
  );
};
