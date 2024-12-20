import RcForm from 'rc-field-form';
import { FC, useState, useMemo, useCallback } from 'react';
import Input from '../../form/form-controls/input';
import FormItem from '../../form/form-item';

type Props = {
    onSearch?: (val?: string) => void;
    loading?: boolean;
}

const ActionSearchInput: FC<Props> = ({ onSearch, loading }) => {
    const [rcForm] = RcForm.useForm();

    const [keywords, setKeywords] = useState<string>();

    const onFinish = (values: any) => {
        setKeywords(values.keywords);
        onSearch?.(values.keywords);
    }

    const resetForm = useCallback(() => {
        rcForm.resetFields();
        setKeywords(undefined);
        onSearch?.();
    }, [onSearch, rcForm])

    const suffix = useMemo(() => {
        if (loading) {
            return (
                <span
                    className='flex items-center justify-center w-5 h-5 text-sm rounded-full opacity-40 animate-spin'
                >
                    <i className="fi fi-rr-rotate-right"></i>
                </span>
            )
        }
        if (keywords) {
            return (
                <span
                    onClick={resetForm}
                    className='flex items-center justify-center w-5 h-5 text-sm bg-slate-100 dark:bg-steel-gray-900 rounded-full cursor-pointer'
                >
                    <i className="fi fi-rr-cross-small"></i>
                </span>
            )
        }

        return (
            <span
                className='flex items-center justify-center w-5 h-5 text-sm rounded-full opacity-40'
            >
                <i className="fi fi-rr-search"></i>
            </span>
        )
    }, [keywords, loading, resetForm])

    return (
        <div className='flex items-center flex-1 w-full max-w-[250px]'>
            <RcForm
                onFinish={onFinish}
                form={rcForm}
                className="w-full"
            >
                <FormItem
                    name={'keywords'}
                    hideError
                >
                    <Input
                        placeholder="Search..."
                        maxLength={255}
                        className="!py-1.5 !px-3"
                        suffix={suffix}
                        wrapClassName="bg-white dark:bg-steel-gray-950 dark:border-steel-gray-900 dark:hover:border-steel-gray-800"
                    />
                </FormItem>
            </RcForm>
        </div>
    );
}

export default ActionSearchInput;
