import ClapRoundOffSmallXml from '../../constants/Icons/Reacts/ClapRoundOffSmallXml';
import EyesRoundOffSmallXml from '../../constants/Icons/Reacts/EyesRoundOffSmallXml';
import FireRoundOffSmallXml from '../../constants/Icons/Reacts/FireRoundOffSmallXml';
import HeartRoundOffSmallXml from '../../constants/Icons/Reacts/HeartRoundOffSmallXml';
import SadRoundOffSmallXml from '../../constants/Icons/Reacts/SadRoundOffSmallXml';
import SurpriseRoundOffSmallXml from '../../constants/Icons/Reacts/SurpriseRoundOffSmallXml';
import theme from '../../theme/light';

export const REACTIONS: Record<string, any>[] = [
  {
    name: 'CLAP',
    reaction: 'clap',
    clicked: 'isClapClicked',
    xml: ClapRoundOffSmallXml,
    bezier: [0.5, 1.8, 0.4, 1.0],
    color: theme.colors.graphic.sky,
  },
  {
    name: 'HEART',
    reaction: 'heart',
    clicked: 'isHeartClicked',
    xml: HeartRoundOffSmallXml,
    bezier: [0.5, 1.8, 0.4, 1.12],
    color: theme.colors.graphic.green,
  },
  {
    name: 'SAD',
    reaction: 'sad',
    clicked: 'isSadClicked',
    xml: SadRoundOffSmallXml,
    bezier: [0.5, 1.8, 0.4, 1.24],
    color: theme.colors.graphic.purple,
  },
  {
    name: 'SURPRISE',
    reaction: 'surprise',
    clicked: 'isSurpriseClicked',
    xml: SurpriseRoundOffSmallXml,
    bezier: [0.5, 1.8, 0.4, 1.36],
    color: theme.colors.graphic.coral,
  },
  {
    name: 'EYES',
    reaction: 'eyes',
    clicked: 'isEyesClicked',
    xml: EyesRoundOffSmallXml,
    bezier: [0.5, 1.8, 0.4, 1.48],
    color: theme.colors.graphic.marine,
  },
  {
    name: 'FIRE',
    reaction: 'fire',
    clicked: 'isFireClicked',
    xml: FireRoundOffSmallXml,
    bezier: [0.5, 1.8, 0.4, 1.6],
    color: theme.colors.graphic.orange,
  },
];
