import { FC } from "react";

type Props = {
    titleWidth?: number;
}

const FormFieldSkeleton: FC<Props> = ({titleWidth = 1/2}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="w-1/2 h-3 bg-slate-900/10 dark:bg-slate-700 rounded-sm" style={{width: `${titleWidth * 100}%`}}></div>
            <div className="w-full h-9 bg-slate-900/10 dark:bg-slate-700 rounded border border-slate-90/10 dark:border-slate-600"></div>
        </div>
    )
}

const FormImageSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="w-full h-56 bg-slate-900/10 dark:bg-slate-700 rounded border border-slate-90/10 dark:border-slate-600"></div>
        </div>
    )
}

const FormSkeleton = () => {

    return (
        <div className='w-full min-h-screen max-h-screen overflow-hidden flex flex-col relative'>
            <div className="w-full max-w-[640px] mx-auto pt-16">
                <div className="flex justify-start gap-3">
                    <h1 className="text-3xl font-bold">Formini | Untitled form</h1>
                </div>

                <div className="flex flex-col gap-6 mt-10">
                    <FormFieldSkeleton titleWidth={1/2} />
                    <FormFieldSkeleton titleWidth={1/3} />
                    <FormFieldSkeleton titleWidth={1/2} />
                    <FormFieldSkeleton titleWidth={1/4} />
                    <FormImageSkeleton />
                    <FormFieldSkeleton titleWidth={1/1.5} />
                    <FormFieldSkeleton titleWidth={1/5} />
                </div>
            </div>
            <div className="backdrop-blur dark:bg-black/40 absolute top-0 left-0 bottom-0 right-0"></div>
        </div>
    );
}

export default FormSkeleton;
