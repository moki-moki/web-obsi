interface Props {
  name: string;
}

const Note = ({ name }: Props) => {
  return (
    <div className="text-white">
      {name.length > 20 ? `${name.substring(0, 20)}...` : name}
    </div>
  );
};

export default Note;
