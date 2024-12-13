"use client";
import { Icons } from "@/icons/icons";
import { IconImages } from "@/icons/icon_images";
import { DateFormating } from "@/utils/date.format";
import React, { forwardRef } from "react";
import ActionController from "./action_controller";
import { user } from "@/constants/data";
import { checkLike } from "@/hooks/actions/like.hooks";

const PostCard = forwardRef(({ post }, ref) => {
  const { content, date, email, name, image, postImage } = post;
  const { likeCount } = checkLike(post.id, user.id);

  // Format post date based on how recent it is
  const formattedDate = DateFormating(date);

  return (
    <div
      ref={ref}
      className="post-card bg-white rounded-md shadow-md text-black"
    >
      <div className="card__header px-3 pt-3 flex justify-between">
        <div className="flex">
          <div className="post-header--left mb-4 flex h-10">
            <div className="left__image">
              <img
                src={image}
                alt="Post image"
                className="h-full w-10 rounded-full mr-2"
              />
            </div>
            <div className="mr-2">
              <div className="font-semibold">{name}</div>
              <div className="flex items-center h-4">
                <div className="text-sm text-gray-500">{formattedDate}</div>
                <div className="mx-1 text-sm pb-2">.</div>
                <div className="text-sm text-gray-600">{email}</div>
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
      <div className="card__content">
        {content && (
          <div className="content-text px-4 pb-4">
            <p>{content}</p>
          </div>
        )}
        {postImage && (
          <div className="content-image w-full">
            <img src={postImage} alt="Post Image" className="w-full" />
          </div>
        )}
      </div>
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
        {/* Control the like, comment, post or share action that user might use */}
        <ActionController postId={post.id} userId={user.id} />
      </div>
    </div>
  );
});

export default PostCard;
