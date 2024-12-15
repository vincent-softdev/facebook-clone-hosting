const { default: CustomModal } = require("@/components/modal/custom_modal");

const PostDetailModal = ({ closeModal, title }) => {
  return <CustomModal closeModal={closeModal} title={title}></CustomModal>;
};

export default PostDetailModal;
