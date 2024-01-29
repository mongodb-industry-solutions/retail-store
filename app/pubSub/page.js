import Footer from "../_components/footer/Footer";
import Navbar from "../_components/navbar/Navbar";
import PubSubs from "../_components/pubSub/PubSubs";

export default function Page() {
  return (
    <>
      <Navbar></Navbar>
      <PubSubs></PubSubs>
      <Footer></Footer>
    </>
  );
}
