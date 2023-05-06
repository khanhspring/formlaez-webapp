import { FC, useRef, useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

type Props = {
    target?: HTMLElement | null;
}

const ExternalScroll: FC<Props> = ({ target }) => {

    const container = useRef<HTMLDivElement>(null);
    const [cols, setCols] = useState([...Array(0)]);
    const [value, setValue] = useState(0);

    const onTargetScroll = (e: any) => {
        const element = e.target as HTMLElement;
        const scrollContentWith = element.scrollWidth - element.offsetWidth;
        const scrollLeft = element.scrollLeft;
        setValue(scrollLeft / scrollContentWith * 100);
    }

    useEffect(() => {
        if (container?.current) {
            const width = container.current.offsetWidth;
            const colCount = Math.round(width / 12);
            setCols([...Array(colCount)]);
        }
    }, [container, target]);

    useEffect(() => {
        if (target) {
            target.addEventListener("scroll", onTargetScroll);
        }
        return () => {
            target?.removeEventListener("scroll", onTargetScroll);
        }
    }, [target]);

    if (!target) {
        return <></>;
    }

    const scrollContentWith = target.scrollWidth - target.offsetWidth
    const stepWidth = scrollContentWith / 100;


    if (scrollContentWith <= 0) {
        return <></>
    }

    const onChange = (value: number) => {
        setValue(value);
        target.scrollTo({
            left: stepWidth * value,
        })
    }

    return (
        <div className="fixed z-[1000] bottom-[70px] right-7 w-[140px] h-[55px]">
            <div className='w-full h-full border border-slate-900/10 bg-slate-200 dark:border-steel-gray-800 dark:bg-steel-gray-900 shadow-lg overflow-hidden rounded p-2'>
                <div ref={container} className='w-full h-full relative'>
                    <ReactSlider
                        value={value}
                        className="w-full h-full"
                        thumbClassName="w-10 h-full text-xs bg-transparent flex items-center justify-center cursor-move rounded-sm outline outline-2 outline-blue-700"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}%</div>}
                        onChange={onChange}
                    />
                    <div className='absolute w-full h-full top-0 left-0 flex justify-between'>
                        {
                            cols.map((item, index) =>
                                <div key={index} className="w-2.5 h-full bg-slate-300 dark:bg-steel-gray-950 top-0 left-0 rounded"></div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExternalScroll;
