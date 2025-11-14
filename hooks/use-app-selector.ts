import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export const useAppSelector: typeof useSelector = (selector) => useSelector((state: RootState) => selector(state));
