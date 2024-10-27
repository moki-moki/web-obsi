import { useParams } from 'next/navigation';

const useCurrentPathId = () => {
  const params = useParams();

  return params;
};

export default useCurrentPathId;
