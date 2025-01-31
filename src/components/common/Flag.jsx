const FLAG_BASE_URL = "https://flagcdn.com";

const Flag = ({ iso }) => {
  return (
    <div className="relative h-4 w-6">
      <img
        src={`${FLAG_BASE_URL}/24x18/${iso?.toLowerCase()}.png`}
        alt=""
        className="h-4 w-6 rounded-sm object-cover"
        loading="eager"
        // Add error handling for flag loading
        onError={(e) => {
          e.target.src = `${FLAG_BASE_URL}/24x18/in.png`; // Default to India flag
        }}
        // Add a small placeholder while loading
        style={{
          backgroundImage: "linear-gradient(to right, #f0f0f0, #e0e0e0)",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

// Preload commonly used country flags
const preloadFlags = () => {
  const commonCountries = ["in", "us", "gb", "ca", "au"];
  commonCountries.forEach((country) => {
    const img = new Image();
    img.src = `${FLAG_BASE_URL}/24x18/${country}.png`;
  });
};

// Call preload when component mounts
if (typeof window !== "undefined") {
  preloadFlags();
}

export default Flag;
