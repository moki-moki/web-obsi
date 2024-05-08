import Image from "next/image";

const EmployeeCard = () => {
  return (
    <div className="border border-gray rounded-full px-4 py-2 flex items-center gap-2">
      <Image
        src="/photos/evil-rabbit.png"
        alt="employee card"
        width={50}
        height={50}
        className="rounded-full"
      />
      <h4 className="text-white">Greg</h4>
    </div>
  );
};

export default EmployeeCard;
