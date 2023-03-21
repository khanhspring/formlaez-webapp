import { createBrowserRouter, Outlet, Params, redirect, RouterProvider } from "react-router-dom";
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
import TeamService from "./app/services/team-service";
import UserSessionService from "./app/services/user-session-service";
import WorkspaceService from "./app/services/workspace-service";
import { selectTheme } from "./app/slices/app-config";
import { lazyLoad } from "./app/util/lazy-load";

const userSessionLoader = async (data: any) => {
  try {
    const userSession = await UserSessionService.getCurrentUserSession();
    if (!userSession.onboarded) {
      return redirect('/onboarding');
    }
    return userSession;
  } catch (e: any) {
    return redirect('/logout');
  }
};

const workspaceLoader = async ({ params }: { params: Params }) => {
  try {
    return await WorkspaceService.getByCode(params['workspaceCode']);
  } catch (e: any) {
    return redirect('/error');
  }
};

const teamLoader = async ({ params }: { params: Params }) => {
  try {
    return await TeamService.getByCode(params['teamCode']);
  } catch (e: any) {
    return redirect('/error');
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
                    path: "p",
                    element: <RequireAuth><Private /></RequireAuth>
                  },
                  {
                    path: "p/f/:formCode",
                    element: lazyLoad('form', true)
                  },
                  {
                    path: "p/f/:formCode/document-templates",
                    element: lazyLoad('form/document-templates', true)
                  },
                  {
                    path: "p/f/:formCode/settings",
                    element: lazyLoad('form/form-settings', true)
                  },
                  {
                    path: "t",
                    element: lazyLoad('team', true)
                  },
                  {
                    path: "settings",
                    element: lazyLoad('settings', true),
                    children: [
                      {
                        path: '',
                        element: lazyLoad('settings/workspace-settings', true),
                      },
                      {
                        path: 'members',
                        element: lazyLoad('settings/workspace-members', true),
                      },
                      {
                        path: 'billing',
                        element: lazyLoad('settings/workspace-billing', true),
                      },
                      {
                        path: 'usages',
                        element: lazyLoad('settings/workspace-usages', true),
                      }
                    ]
                  },
                  {
                    id: "team",
                    path: "t/:teamCode",
                    loader: teamLoader,
                    children: [
                      {
                        path: "",
                        element: lazyLoad('team/team-detail', true)
                      },
                      {
                        path: "f/:formCode",
                        element: lazyLoad('form', true)
                      },
                      {
                        path: "f/:formCode/settings",
                        element: lazyLoad('form/form-settings', true)
                      },
                      {
                        path: "f/:formCode/document-templates",
                        element: lazyLoad('form/document-templates', true)
                      },
                      {
                        path: "t/:teamCode",
                        element: lazyLoad('team/team-detail', true)
                      },
                    ]
                  }
                ],
              },
              {
                element: <OnlyFooterLayout />,
                children: [
                  {
                    path: "p/f/:formCode/full",
                    element: lazyLoad('form/data-full-screen', true)
                  },
                  {
                    path: "f/:formCode/full",
                    element: lazyLoad('form/data-full-screen', true)
                  },
                  {
                    path: "workspaces/setup",
                    element: lazyLoad('workspace/setup', true)
                  }
                ]
              },
              {
                id: "teamForm",
                path: "t/:teamCode",
                loader: teamLoader,
                element: <OnlyFooterLayout />,
                children: [
                  {
                    path: "f/:formCode/full",
                    element: lazyLoad('form/data-full-screen', true)
                  }
                ]
              }
            ]
          },
          {
            id: 'form',
            path: '',
            children: [
              {
                element: <BlankLayout />,
                children: [
                  {
                    path: "f/:formCode/preview",
                    element: lazyLoad('form/form-preview', true)
                  }
                ]
              },
            ]
          },
          {
            id: 'formBuilder',
            path: '',
            children: [
              {
                element: <OnlyFooterLayout />,
                children: [
                  {
                    path: "f/:formCode/builder",
                    element: lazyLoad('form/form-edit', true)
                  },
                ]
              },
            ]
          }
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
          },
          {
            path: "error",
            element: <Error />
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
