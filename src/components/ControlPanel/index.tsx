/** @format */
import {
  CloseButton,
  CloseDayButton,
  ControlButtons,
  ControlButtonsBlock,
  ControllerBox,
  DescriptionText,
  MenuBox,
  MenuButton,
  MenuItem,
  MenuText,
  ReportButton,
  Root,
  RoundBox,
  SaveButton,
} from './styles.ts';
import {Close, ContentCopy, Menu, Save} from '@mui/icons-material';
import {useAppContext} from '../../context/appContext.tsx';
import {type ChangeEvent, useState} from 'react';
import {Drawer, Modal, Switch, Typography} from '@mui/material';
import {CustomTextField} from '../UI/CustomTextField';
import {CustomNumberField} from '../UI/CustomNumberField';
import {CloseDayModal} from '../modals/CloseDayModal';

const ControlPanel = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const {onSave, canSave, onReport, onUpdateSettings, settings, onAddReport, savedTasks} =
    useAppContext();

  const handleOpenMenu = () => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleUpdatePrefix = (value: string) => {
    onUpdateSettings('prefix', value);
  };

  const handleUpdateStoryPoint = (value: string) => {
    onUpdateSettings('storyPoint', parseInt(value));
  };

  const handleUpdateRoundDuration = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onUpdateSettings('roundDuration', checked);
  };

  const handleUpdateAutosave = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    onUpdateSettings('autosave', checked);
  };

  // const handleUpdateStartNew = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
  //   onUpdateSettings('startNewAfterDone', checked);
  // };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleConfirmCloseDay = () => {
    onAddReport();
    setOpenModal(false);
  };

  const disableCloseDay = savedTasks.length === 0;

  return (
    <Root>
      <ControlButtons>
        <ControlButtonsBlock>
          <MenuButton disableRipple onClick={handleOpenMenu}>
            <Menu fontSize='large' />
          </MenuButton>
          {!settings.autosave && (
            <SaveButton onClick={onSave} disabled={!canSave}>
              <Save /> Сохранить
            </SaveButton>
          )}
          <ReportButton onClick={onReport} title='Копировать отчёт в буфер обмена'>
            <ContentCopy />
          </ReportButton>
          <CloseDayButton disabled={disableCloseDay} onClick={handleOpenModal}>
            Закончить день
          </CloseDayButton>
        </ControlButtonsBlock>

        <ControlButtonsBlock>
          <RoundBox>
            <Typography>Округлить до {settings.storyPoint}m</Typography>
            <Switch checked={settings.roundDuration} onChange={handleUpdateRoundDuration} />
          </RoundBox>
        </ControlButtonsBlock>
      </ControlButtons>

      <Drawer open={openMenu} onClose={handleCloseMenu}>
        <MenuBox>
          <MenuItem>
            <MenuText>Префикс новых задач</MenuText>
            <ControllerBox>
              <CustomTextField value={settings.prefix} onChange={handleUpdatePrefix} />
            </ControllerBox>
          </MenuItem>

          <MenuItem>
            <MenuText>Сторипойнт, мин.</MenuText>
            <ControllerBox>
              <CustomNumberField
                value={String(settings.storyPoint)}
                onChange={handleUpdateStoryPoint}
                maxLength={3}
                min={0}
              />
            </ControllerBox>
          </MenuItem>

          <MenuItem>
            <MenuText>Округлить длительность</MenuText>
            <ControllerBox>
              <Switch checked={settings.roundDuration} onChange={handleUpdateRoundDuration} />
            </ControllerBox>
          </MenuItem>

          <DescriptionText>
            Колонка "Длительность" в таблице будет визуально округлена до сторипойнта. Также
            округление отразится в отчётах.
          </DescriptionText>

          {/*<MenuItem>*/}
          {/*  <MenuText>Начать новую задачу после записи или продления</MenuText>*/}
          {/*  <ControllerBox>*/}
          {/*    <Switch checked={settings.startNewAfterDone} onChange={handleUpdateStartNew} />*/}
          {/*  </ControllerBox>*/}
          {/*</MenuItem>*/}

          <MenuItem>
            <MenuText>Автосохранение</MenuText>
            <ControllerBox>
              <Switch checked={settings.autosave} onChange={handleUpdateAutosave} />
            </ControllerBox>
          </MenuItem>

          <DescriptionText>
            Автосохранение будет происходить при каждом изменении записей. Ручное сохранение будет
            недоступно.
          </DescriptionText>

          <CloseButton onClick={handleCloseMenu}>
            <Close />
          </CloseButton>
        </MenuBox>
      </Drawer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <CloseDayModal onConfirm={handleConfirmCloseDay} onClose={handleCloseModal} />
      </Modal>
    </Root>
  );
};

export {ControlPanel};
