import { Popup } from 'ez-rc-popup';
import { FC, useState } from 'react';
import { Form, FormSection } from '../../../models/form';
import AddNewMenu from './action-menu/add-new-menu';

type Props = {
    form?: Form;
    section?: FormSection;
    sectionIndex: number;
}

const EmptyGroup: FC<Props> = ({ form, section, sectionIndex }) => {
    const [addNewMenuVisible, setAddNewMenuVisible] = useState(false);

    const menu = (
        <AddNewMenu
            onMenuClick={() => setAddNewMenuVisible(false)}
            context={{
                type: 'GroupField',
                sectionIndex: sectionIndex,
                fieldIndex: -1,
                section: section
            }}
            visible={addNewMenuVisible}
        />
    )

    return (
        <Popup
            trigger="click"
            content={menu}
            placement="bottom"
            open={addNewMenuVisible}
            onOpenChange={setAddNewMenuVisible}
            className="bg-transparent"
            disabled={form?.status === 'Archived'}
        >
            <div className='w-full px-5 py-2 rounded border border-cinder-700 border-dashed cursor-pointer'>
                {
                    form?.status !== 'Archived' ? 'Click to add new group element' : 'Empty group'
                }
            </div>
        </Popup>
    );
}

export default EmptyGroup;