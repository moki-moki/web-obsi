import { useParams } from 'next/navigation';

const useCurrentPathId = () => {
  const params = useParams();

  return params.id;
};

export default useCurrentPathId;
