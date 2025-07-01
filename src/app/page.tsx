import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { useSeedPhraseState } from "@/context/seed";
export default function Home() {
  //If the user closes the tab clear the mnemonics
  // window.addEventListener('beforeunload', () => {
  //   useSeedPhraseState.setState({ mnemonics: '', selectedChain: null });
  // });
  return (
    <div className="">
      <Hero />
    </div>
  );
}
