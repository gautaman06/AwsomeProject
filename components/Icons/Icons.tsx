import IconHome from '../../assets/svg/home.svg';
import IconClose from '../../assets/svg/close.svg';
import IconGroup from '../../assets/svg/group.svg';
import IconLeft from '../../assets/svg/left.svg';
import IconRefresh from '../../assets/svg/refresh.svg';
import IconSuccess from '../../assets/svg/success.svg';
import IconTransaction from '../../assets/svg/transaction.svg';
import IconTrip from '../../assets/svg/trip.svg';
import IconCouple from '../../assets/svg/couple.svg';
import LoadingIcon from './LoadingIcon';
import IconLoad from '../../assets/svg/load.svg';
import IconPaymentPending from '../../assets/svg/payment-pending.svg';
import IconDelete from '../../assets/svg/delete.svg';
import IconEdit from '../../assets/svg/edit.svg';

interface IIconsProps {
  icon: string;
  svgProps?: any;
}

const Icon = (props: IIconsProps) => {
  const { icon, svgProps } = props;
  switch (icon) {
    case 'refresh':
      return <IconRefresh />;

    case 'group':
      return <IconGroup />;

    case 'trip':
      return <IconTrip />;

    case 'home':
      return <IconHome />;

    case 'couple':
      return <IconCouple />;

    case 'close':
      return <IconClose width={18} height={18} />;

    case 'success':
      return <IconSuccess {...svgProps} />;

    case 'loading':
      return <LoadingIcon />;

    case 'load':
      return <IconLoad width={60} height={60} />;

    case 'left':
      return <IconLeft />;

    case 'transaction':
      return <IconTransaction {...svgProps} />;

    case 'payment-pending':
      return <IconPaymentPending width={25} height={25} />;

    case 'edit':
      return <IconEdit />;

    case 'delete':
      return <IconDelete />;
  }
};

export default Icon;
