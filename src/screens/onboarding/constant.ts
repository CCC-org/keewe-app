import ClapRoundOffXml from '../../constants/Icons/Reacts/HeartRoundOffXml';
import EyesRoundOffXml from '../../constants/Icons/Reacts/EyesRoundOffXml';
import FireRoundOffXml from '../../constants/Icons/Reacts/FireRoundOffXml';
import HeartRoundOffXml from '../../constants/Icons/Reacts/ClapRoundOffXml';
import SadRoundOffXml from '../../constants/Icons/Reacts/SadRoundOffXml';
import SurpriseRoundOffXml from '../../constants/Icons/Reacts/SurpriseRoundOffXml';
import theme from '../../theme/light';

export const REACTIONS: Record<string, any>[] = [
  { xml: ClapRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.0], color: theme.colors.graphic.sky },
  { xml: HeartRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.12], color: theme.colors.graphic.green },
  { xml: SadRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.24], color: theme.colors.graphic.purple },
  { xml: SurpriseRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.36], color: theme.colors.graphic.coral },
  { xml: EyesRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.48], color: theme.colors.graphic.marine },
  { xml: FireRoundOffXml, bezier: [0.5, 1.8, 0.4, 1.6], color: theme.colors.graphic.orange },
];
