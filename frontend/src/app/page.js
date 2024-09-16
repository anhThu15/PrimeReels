import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
       <div
        class="alert alert-success"
        role="alert"
       >
        <h4 class="alert-heading">Alert Heading</h4>
        <p>Alert Content</p>
        <hr />
        <p class="mb-0">Alert Description</p>
       </div>
       
    </>
  );
}
