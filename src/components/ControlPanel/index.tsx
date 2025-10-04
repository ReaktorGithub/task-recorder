/** @format */
import {
  ControlButtonsBox,
  ControllerBox,
  DescriptionText,
  MenuBox,
  MenuButton,
  MenuItem,
  MenuText,
  ReportButton,
  ResetButton,
  Root,
  SaveButton,
} from './styles.ts';
import {Clear, ContentCopy, Menu, Save} from '@mui/icons-material';
import {useAppContext} from '../../context/appContext.tsx';
import {type ChangeEvent, useState} from 'react';
import {Drawer, Switch} from '@mui/material';
import {CustomTextField} from '../UI/CustomTextField';

const ControlPanel = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const {onSave, canSave, onReport, onClearTasks, onUpdateSettings, settings} = useAppContext();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleUpdatePrefix = (value: string) => {
    onUpdateSettings('prefix', value);
  };

  const handleUpdateRoundDuration = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onUpdateSettings('roundDuration', checked);
  };

  const handleUpdateAutosave = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onUpdateSettings('autosave', checked);
  };

  return (
    <Root>
      <ControlButtonsBox>
        <MenuButton disableRipple onClick={handleOpenMenu}>
          <Menu fontSize='large' />
        </MenuButton>
        <SaveButton onClick={onSave} disabled={!canSave}>
          <Save /> Сохранить
        </SaveButton>
        <ReportButton onClick={onReport}>
          <ContentCopy />
        </ReportButton>
      </ControlButtonsBox>

      <ResetButton onClick={onClearTasks}>
        <Clear />
      </ResetButton>

      <Drawer open={openMenu} onClose={handleCloseMenu}>
        <MenuBox>
          <MenuItem>
            <MenuText>Префикс новых задач</MenuText>
            <ControllerBox>
              <CustomTextField value={settings.prefix} onChange={handleUpdatePrefix} />
            </ControllerBox>
          </MenuItem>

          <MenuItem>
            <MenuText>Округлить длительность</MenuText>
            <ControllerBox>
              <Switch checked={settings.roundDuration} onChange={handleUpdateRoundDuration} />
            </ControllerBox>
          </MenuItem>

          <DescriptionText>
            Колонка "Длительность" в таблице будет визуально округлена до сторипойнта 15m. Также
            округление отразится в отчёте при нажатии на кнопку "Копировать".
          </DescriptionText>

          <MenuItem>
            <MenuText>Автосохранение</MenuText>
            <ControllerBox>
              <Switch checked={settings.autosave} onChange={handleUpdateAutosave} />
            </ControllerBox>
          </MenuItem>

          <DescriptionText>
            Автосохранение будет происходить при каждом изменении записей.
          </DescriptionText>
        </MenuBox>
      </Drawer>
    </Root>
  );
};

export {ControlPanel};
