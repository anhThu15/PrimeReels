
import "../globals.css";
import ListAdmin from "./components/list";

export default function Home() {
  return (
    <>
         <div className="container-fluid d-flex justify-content-center" style={{ width:"100%"}}>
              <ListAdmin></ListAdmin>
         </div>
    </>
  );
}
