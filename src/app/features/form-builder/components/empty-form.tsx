import { Popup } from 'ez-rc-popup';
import { FC, useState } from 'react';
import { Form } from '../../../models/form';
import AddNewMenu from './action-menu/add-new-menu';

type Props = {
    form?: Form;
}

const EmptyForm: FC<Props> = ({ form }) => {
    const [addNewMenuVisible, setAddNewMenuVisible] = useState(false);

    const menu = (
        <AddNewMenu
            onMenuClick={() => setAddNewMenuVisible(false)}
            context={{ type: 'Group', sectionIndex: -1 }}
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
        >
            <div className={`w-full p-5 rounded border border-cinder-700 border-dashed cursor-pointer`}>
                Click to add new form element
            </div>
        </Popup>
    );
}

export default EmptyForm;