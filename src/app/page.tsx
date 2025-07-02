import Hero from "@/components/hero";
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
