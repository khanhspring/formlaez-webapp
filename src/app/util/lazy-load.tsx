import { lazy, Suspense } from 'react';

export function lazyLoad(folder: string, fileName?: string) {
    const LazyElement = lazy(() => import(`../pages/${folder}${fileName ? `/${fileName}.tsx` : ''}`));

    return (
        <Suspense fallback={<></>}>
            <LazyElement />
        </Suspense>
    );
}