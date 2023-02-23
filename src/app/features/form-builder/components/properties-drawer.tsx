import { FC } from 'react';
import Drawer from '../../../components/drawer/drawer';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hook';
import { clearCurrentItem, selectCurrentItem } from '../slice';
import FieldProperties from './field-properties/field-properties';
import GroupProperties from './group-properties/group-properties';

type Props = {
}

const PropertiesDrawer: FC<Props> = () => {

    const currentItem = useAppSelector(selectCurrentItem);
    const dispatch = useAppDispatch();

    const closeProperties = () => {
        dispatch(clearCurrentItem());
    }

    const properties = (
        <>
            {
                (currentItem?.type === 'SingleField' || currentItem?.type === 'GroupField')
                && currentItem.field
                && <FieldProperties field={currentItem.field} context={currentItem} />
            }
            {
                (currentItem?.type === 'Group')
                && currentItem.section
                && <GroupProperties section={currentItem.section} context={currentItem} />
            }
        </>
    )

    return (
        <Drawer
            open={!!currentItem}
            onClose={closeProperties}
            title="Edit properties"
            width={500}
        >
            <>
                {properties}
            </>
        </Drawer>
    );
}

export default PropertiesDrawer;