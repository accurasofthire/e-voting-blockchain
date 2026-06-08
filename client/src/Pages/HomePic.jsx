import vote1 from "../pics/e-voting.png";
function HomePic() {
  return (
    <div className="absolute top-20 right-12">
      <img
        src={vote1}
        alt="Vote pic"
        className="float-right object-fill h-[70vh]"
      />
    </div>
  );
}

export default HomePic;
