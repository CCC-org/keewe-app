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
    xml: ClapRoundOffSmallXml,
    color: theme.colors.graphic.sky,
  },
  {
    name: 'HEART',
    reaction: 'heart',
    xml: HeartRoundOffSmallXml,
    color: theme.colors.graphic.green,
  },
  {
    name: 'SAD',
    reaction: 'sad',
    xml: SadRoundOffSmallXml,
    color: theme.colors.graphic.purple,
  },
  {
    name: 'SURPRISE',
    reaction: 'surprise',
    xml: SurpriseRoundOffSmallXml,
    color: theme.colors.graphic.coral,
  },
  {
    name: 'EYES',
    reaction: 'eyes',
    xml: EyesRoundOffSmallXml,
    color: theme.colors.graphic.marine,
  },
  {
    name: 'FIRE',
    reaction: 'fire',
    xml: FireRoundOffSmallXml,
    color: theme.colors.graphic.orange,
  },
];
