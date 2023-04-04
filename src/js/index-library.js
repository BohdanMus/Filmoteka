import { onOpenModalTeamClick } from './team-modal';
import './spinner';
const refs = {
  openModalTeamBtn: document.getElementById('open-modal-btn'),
};

// Обробник події для відкриття модального вікна з командою
refs.openModalTeamBtn.addEventListener('click', onOpenModalTeamClick);
