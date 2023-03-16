import { createBrowserRouter, Params, redirect, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "./app/components/common/loading";
import { RequireAuth } from "./app/components/common/require-auth";
import ScrollToTop from "./app/components/common/scroll-to-top";
import { useAppSelector } from "./app/hooks/redux-hook";
import BlankLayout from "./app/layouts/blank";
import OnlyFooterLayout from "./app/layouts/only-footer";
import PrimaryLayout from "./app/layouts/primary";
import Error401 from "./app/pages/auth/error-401";
import LoginCode from "./app/pages/auth/login-code";
import Logout from "./app/pages/auth/logout";
import Error from "./app/pages/error/Error";
import HomePage from "./app/pages/home";
import Private from "./app/pages/private";
import UserSessionService from "./app/services/user-session-service";
import WorkspaceService from "./app/services/work-space-service";
import { selectTheme } from "./app/slices/app-config";
import { lazyLoad } from "./app/util/lazy-load";

const userSessionLoader = async (data: any) => {
  try {
    const userSession = await UserSessionService.getCurrentUserSession();
    if (!userSession.onboarded) {
      return redirect('/onboarding');
    }
    return userSession;
  } catch (e) {
    // return null to avoid error
    return null;
  }
};

const workspaceLoader = async ({params}: {params: Params}) => {
  try {
    return await WorkspaceService.getByCode(params['workspaceCode']);
  } catch (e) {
    // return null to avoid error
    return null;
  }
};

const router = createBrowserRouter([
  {
    id: 'root',
    errorElement: <Error />,
    element: <ScrollToTop />,
    children: [
      {
        id: 'private',
        loader: userSessionLoader,
        children: [
          {
            id: 'home',
            path: '/',
            element: <RequireAuth><HomePage /></RequireAuth>
          },
          {
            id: 'workspace',
            path: ':workspaceCode',
            loader: workspaceLoader,
            children: [
              {
                element: <PrimaryLayout />,
                children: [
                  {
                    path: "",
                    element: <RequireAuth><Private /></RequireAuth>
                  },
                  {
                    path: "private",
                    element: <RequireAuth><Private /></RequireAuth>
                  },
                  {
                    path: "members",
                    element: lazyLoad('member/list-member', true)
                  },
                  {
                    path: "teams",
                    element: lazyLoad('team', true)
                  },
                  {
                    path: "teams/:teamCode",
                    element: lazyLoad('team/team-detail', true)
                  },
                  {
                    path: "private/forms/:formCode",
                    element: lazyLoad('form', true)
                  },
                  {
                    path: "teams/:teamCode/forms/:formCode",
                    element: lazyLoad('form', true)
                  },
                  {
                    path: "private/forms/:formCode/document-templates",
                    element: lazyLoad('form/document-templates', true)
                  },
                  {
                    path: "teams/:teamCode/forms/:formCode/document-templates",
                    element: lazyLoad('form/document-templates', true)
                  },
                  {
                    path: "private/forms/:formCode/settings",
                    element: lazyLoad('form/form-settings', true)
                  },
                  {
                    path: "teams/:teamCode/forms/:formCode/settings",
                    element: lazyLoad('form/form-settings', true)
                  },
                  {
                    path: "checkout",
                    element: lazyLoad('checkout', true)
                  }
                ],
              },
              {
                element: <BlankLayout />,
                children: [
                  {
                    path: "teams/:teamCode/forms/:formCode/preview",
                    element: lazyLoad('form/form-preview', true)
                  },
                  {
                    path: "private/forms/:formCode/preview",
                    element: lazyLoad('form/form-preview', true)
                  },
                ]
              },
              {
                element: <OnlyFooterLayout />,
                children: [
                  {
                    path: "teams/:teamCode/forms/:formCode/edit",
                    element: lazyLoad('form/form-edit', true)
                  },
                  {
                    path: "private/forms/:formCode/edit",
                    element: lazyLoad('form/form-edit', true)
                  },
                  {
                    path: "private/forms/:formCode/full",
                    element: lazyLoad('form/data-full-screen', true)
                  },
                  {
                    path: "teams/:teamCode/forms/:formCode/full",
                    element: lazyLoad('form/data-full-screen', true)
                  },
                  {
                    path: "workspaces/setup",
                    element: lazyLoad('workspace/setup', true)
                  }
                ]
              }
            ]
          },
        ]
      },
      {
        id: 'onboarding',
        children: [
          {
            path: "onboarding",
            element: lazyLoad('onboarding', true)
          },
        ]
      },
      {
        id: 'formViewer',
        element: <BlankLayout />,
        children: [
          {
            path: "f/v/:formCode",
            element: lazyLoad('form-viewer/form-viewer', false)
          },
          {
            path: "f/v/:formCode/s/:submissionCode",
            element: lazyLoad('form-viewer/form-submitted', false)
          },
        ]
      },
      {
        id: 'public',
        element: <BlankLayout />,
        children: [
          {
            path: "/login",
            element: lazyLoad('login')
          },
          {
            path: "login/code",
            element: <LoginCode />
          },
          {
            path: "logout",
            element: <Logout />
          },
          {
            path: "errors/401",
            element: <Error401 />
          }
        ]
      }
    ]
  },
]);

function App() {

  const theme = useAppSelector(selectTheme);

  return (
    <>
      <ToastContainer
        hideProgressBar
        closeButton={false}
        theme={theme}
        toastClassName="min-h-0"
        bodyClassName="py-0 px-1 text-slate-900 dark:text-white"
        className="text-sm w-auto"
        position="top-center"
        limit={3}
        autoClose={3000}
        pauseOnFocusLoss={false}
      />
      <RouterProvider
        router={router}
        fallbackElement={<Loading center />}
      />
    </>
  );
}

export default App;
