import SelectionArea, { SelectionEvent } from '@viselect/react';
import { FC, PropsWithChildren } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hook';
import { SelectionItem } from '../../../models/form';
import { applySelectedItems, removeSections, selectSelectedItems, setSelectedItems } from '../slice';
import _ from 'lodash';

type Props = PropsWithChildren & {

}

const FormBodySelection: FC<Props> = ({ children }) => {

    const dispatch = useAppDispatch();
    const selectedItems = useAppSelector(selectSelectedItems);

    const extractSelectionItems = (els: Element[]): SelectionItem[] => {
        return els.map(v => {
            const selectionItem: SelectionItem = {
                sectionCode: v.getAttribute('selection-data-code') || '',
                sectionIndex: +(v.getAttribute('selection-data-index') || 0),
            }
            return selectionItem;
        })
    }

    const onStart = ({ event, selection }: SelectionEvent) => {
        if (!event?.ctrlKey && !event?.metaKey) {
            selection.clearSelection();
            dispatch(setSelectedItems([]))
        }
    };

    const onMove = ({ store: { changed: { added, removed } } }: SelectionEvent) => {
        const addedItems = extractSelectionItems(added);
        const removedItems = extractSelectionItems(removed);
        dispatch(applySelectedItems({ added: addedItems, removed: removedItems }))
    };

    const clearAll = () => {
        dispatch(setSelectedItems([]))
    }

    const removeSelectedItems = () => {
        const codes = selectedItems.map(item => item.sectionCode);
        dispatch(removeSections({codes}));
    }
    useHotkeys('delete', removeSelectedItems, { preventDefault: true, enabled: true });

    const onBeforeStart = (e: any) => {
        const className = e.event?.target.className || '';
        if (!className || (typeof className === 'string' && !className.includes('selection-area-allowed'))) {
            return false;
        }
    }

    return (
        <div
            className='w-full'
            onMouseDown={clearAll}
        >
            <SelectionArea
                className="w-full select-none pb-72 pt-10 selection-area-allowed"
                onStart={onStart}
                onMove={onMove}
                selectables=".selectable"
                onBeforeStart={onBeforeStart}
            >
                {children}
            </SelectionArea>
        </div>
    );
}

export default FormBodySelection;