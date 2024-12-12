import ScrollEffect from "../lib/Scrolling";

function Parallax() {
  return (
    <ScrollEffect
    as="section"
      startScroll={200}
      endScroll={600}
      effects={{
        translate: { x: 500 },
      }}
    >
      Parallax Container Scroll
    </ScrollEffect>
  );
}

export default Parallax;
