import Modal from "./Modal";

export default function Loading({ isOpen, title = "Please wait...", subtitle = "" }) {
  return <Modal isOpen={isOpen} title={title} subtitle={subtitle} loading />;
}
