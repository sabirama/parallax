import ScrollEffect from "../lib/Scrolling";

function Parallax() {
  return (
    <ScrollEffect
      as="section"
      startScroll={200}
      endScroll={400}
      effects={{
        translate: { x: 2000 },
      }}
    >
      Parallax Container Scroll
    </ScrollEffect>
  );
}

export default Parallax;
