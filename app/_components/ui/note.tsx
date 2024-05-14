interface Props {
  name: string;
}

const Note = ({ name }: Props) => {
  return <div className="text-white">{name}</div>;
};

export default Note;
