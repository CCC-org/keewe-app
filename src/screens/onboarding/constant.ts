import ClapRoundOffXml from '../../constants/Icons/Reacts/HeartRoundOffXml';
import EyesRoundOffXml from '../../constants/Icons/Reacts/EyesRoundOffXml';
import FireRoundOffXml from '../../constants/Icons/Reacts/FireRoundOffXml';
import HeartRoundOffXml from '../../constants/Icons/Reacts/ClapRoundOffXml';
import SadRoundOffXml from '../../constants/Icons/Reacts/SadRoundOffXml';
import SurpriseRoundOffXml from '../../constants/Icons/Reacts/SurpriseRoundOffXml';

export const REACTIONS: Record<string, any>[] = [
  { xml: ClapRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.0] },
  { xml: HeartRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.12] },
  { xml: SadRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.24] },
  { xml: SurpriseRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.36] },
  { xml: EyesRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.48] },
  { xml: FireRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.6] },
];
