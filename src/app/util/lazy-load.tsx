import { lazy, Suspense } from 'react';
import Loading from '../components/common/loading';
import { RequireAuth } from '../components/common/require-auth';

export function lazyLoad(path: string, requireAuth?: boolean) {
    const LazyElement = lazy(() => import(`../pages/${path}`));

    if (requireAuth) {
        return (
            <Suspense fallback={<Loading/>}>
                <RequireAuth>
                    <LazyElement />
                </RequireAuth>
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<Loading/>}>
            <LazyElement />
        </Suspense>
    );
}