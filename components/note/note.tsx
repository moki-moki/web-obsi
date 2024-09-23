interface Props {
  title: string;
}

const Note = ({ title }: Props) => {
  return (
    <div className="text-accent-color">
      {title.length > 20 ? `${title.substring(0, 20)}...` : title}
    </div>
  );
};

export default Note;
