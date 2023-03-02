import { lazy, Suspense } from 'react';
import { RequireAuth } from '../components/common/require-auth';

export function lazyLoad(path: string, requireAuth?: boolean) {
    const LazyElement = lazy(() => import(`../pages/${path}`));

    if (requireAuth) {
        return (
            <Suspense fallback={<></>}>
                <RequireAuth>
                    <LazyElement />
                </RequireAuth>
            </Suspense>
        );
    }

    return (
        <Suspense fallback={<></>}>
            <LazyElement />
        </Suspense>
    );
}