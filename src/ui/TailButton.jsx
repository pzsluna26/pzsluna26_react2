export default function TailButton({ caption, color, onClick, type = "button"}) {
  const bg = {
    blue: "bg-blue-100",
    orange: "bg-orange-200",
    lime: "bg-lime-200",
    white: "bg-white"
  };

  return (
    <button
      type={type}  
      className={`p-4 rounded-xl mx-2
                  hover:cursor-pointer hover: font-bold text-gray-600 
                  ${bg[color] || "bg-gray-500"}`}
      onClick={onClick}
    >
      {caption}
    </button>
  );
}
