import { ReactNode } from 'react'
import SixElementary from '../components/svgs/tree-card/six-months/six-elementary'
import SixMiddleHigh from '@/components/svgs/tree-card/six-months/six-middle-high'
import SixUniversity from '@/components/svgs/tree-card/six-months/six-university'
import SixWork from '@/components/svgs/tree-card/six-months/six-work'
import SixSocial from '@/components/svgs/tree-card/six-months/six-social'
import SixEtc from '@/components/svgs/tree-card/six-months/six-etc'
import OneElementary from '@/components/svgs/tree-card/one-year/one-elementary'
import OneMiddleHigh from '@/components/svgs/tree-card/one-year/one-middle-high'
import OneUniversity from '@/components/svgs/tree-card/one-year/one-university'
import OneWork from '@/components/svgs/tree-card/one-year/one-work'
import OneSocial from '@/components/svgs/tree-card/one-year/one-social'
import OneEtc from '@/components/svgs/tree-card/one-year/one-etc'
import FourElementary from '@/components/svgs/tree-card/four-years/four-elementary'
import FourUniversity from '@/components/svgs/tree-card/four-years/four-university'
import FourMiddleHigh from '@/components/svgs/tree-card/four-years/four-middle-high'
import FourWork from '@/components/svgs/tree-card/four-years/four-work'
import FourSocial from '@/components/svgs/tree-card/four-years/four-social'
import FourEtc from '@/components/svgs/tree-card/four-years/four-etc'
import InfiniteElementary from '@/components/svgs/tree-card/infinite/infinite-elementary'
import InfiniteWork from '@/components/svgs/tree-card/infinite/infinite-work'
import InfiniteSocial from '@/components/svgs/tree-card/infinite/infinite-social'
import InfiniteEtc from '@/components/svgs/tree-card/infinite/infinite-etc'
import InfiniteUniversity from '@/components/svgs/tree-card/infinite/infinite-university'
import InFiniteMiddleHigh from '@/components/svgs/tree-card/infinite/infinite-middle-high'

import SixElementaryFlower from '@/components/svgs/flower-card/six-months/six-elementary-flower'
import SixMiddleHighFlower from '@/components/svgs/flower-card/six-months/six-middle-high-flower'
import SixUniversityFlower from '@/components/svgs/flower-card/six-months/six-university-flower'
import SixWorkFlower from '@/components/svgs/flower-card/six-months/six-work-flower'
import SixSocialFlower from '@/components/svgs/flower-card/six-months/six-social-flower'
import SixEtcFlower from '@/components/svgs/flower-card/six-months/six-etc-flower'
import OneElementaryFlower from '@/components/svgs/flower-card/one-year/one-elementary-flower'
import OneMiddleHighFlower from '@/components/svgs/flower-card/one-year/one-middle-high-flower'
import OneUniversityFlower from '@/components/svgs/flower-card/one-year/one-university-flower'
import OneWorkFlower from '@/components/svgs/flower-card/one-year/one-work-flower'
import OneSocialFlower from '@/components/svgs/flower-card/one-year/one-social-flower'
import OneEtcFlower from '@/components/svgs/flower-card/one-year/one-etc-flower'
import FourElementaryFlower from '@/components/svgs/flower-card/four-years/four-elementary-flower'
import FourMiddleHighFlower from '@/components/svgs/flower-card/four-years/four-middle-high-flower'
import FourUniversityFlower from '@/components/svgs/flower-card/four-years/four-university-flower'
import FourWorkFlower from '@/components/svgs/flower-card/four-years/four-work-flower'
import FourSocialFlower from '@/components/svgs/flower-card/four-years/four-social-flower'
import FourEtcFlower from '@/components/svgs/flower-card/four-years/four-etc-flower'
import InfiniteElementaryFlower from '@/components/svgs/flower-card/infinite/infinite-elementary-flower'
import InfiniteWorkFlower from '@/components/svgs/flower-card/infinite/infinite-work-flower'
import InfiniteSocialFlower from '@/components/svgs/flower-card/infinite/infinite-social-flower'
import InfiniteEtcFlower from '@/components/svgs/flower-card/infinite/infinite-etc-flower'
import InfiniteMiddleHighFlower from '@/components/svgs/flower-card/infinite/infinite-middle-high-flower'
import InfiniteUniversityFlower from '@/components/svgs/flower-card/infinite/infinite-university-flower'

export type Period = 'SIX_MONTHS' | 'ONE_YEAR' | 'FOUR_YEARS' | 'INFINITE'
export type Relation =
  | 'ELEMENTARY_SCHOOL'
  | 'MIDDLE_AND_HIGH_SCHOOL'
  | 'UNIVERSITY'
  | 'WORK'
  | 'SOCIAL'
  | 'ETC'

// type TreeAssetKey = `${Period}_${Relation}`

// // export class TreeType {
// //   constructor(private readonly icon: Record<TreeAssetKey, ReactNode>) {}

// //   render(period: Period, relation: Relation) {
// //     const treeAssetKey = `${period}_${relation}` as TreeAssetKey
// //     const treeSvg = this.icon[treeAssetKey]
// //     return treeSvg
// //   }
// // }

// export const treeCardAsset: Record<TreeAssetKey, ReactNode> = {

type AssetKey = `${Period}_${Relation}`

interface CardAdapter {
  render(period: Period, relation: Relation): ReactNode
}

export class CardType implements CardAdapter {
  constructor(private readonly asset: Record<AssetKey, ReactNode>) {}

  render(period: Period, relation: Relation) {
    const assetKey = `${period}_${relation}` as AssetKey
    const assetSvg = this.asset[assetKey]
    return assetSvg
  }
}

export const treeCardAsset: Record<AssetKey, ReactNode> = {
  SIX_MONTHS_ELEMENTARY_SCHOOL: <SixElementary />,
  SIX_MONTHS_MIDDLE_AND_HIGH_SCHOOL: <SixMiddleHigh />,
  SIX_MONTHS_UNIVERSITY: <SixUniversity />,
  SIX_MONTHS_WORK: <SixWork />,
  SIX_MONTHS_SOCIAL: <SixSocial />,
  SIX_MONTHS_ETC: <SixEtc />,
  ONE_YEAR_ELEMENTARY_SCHOOL: <OneElementary />,
  ONE_YEAR_MIDDLE_AND_HIGH_SCHOOL: <OneMiddleHigh />,
  ONE_YEAR_UNIVERSITY: <OneUniversity />,
  ONE_YEAR_WORK: <OneWork />,
  ONE_YEAR_SOCIAL: <OneSocial />,
  ONE_YEAR_ETC: <OneEtc />,
  FOUR_YEARS_ELEMENTARY_SCHOOL: <FourElementary />,
  FOUR_YEARS_MIDDLE_AND_HIGH_SCHOOL: <FourMiddleHigh />,
  FOUR_YEARS_UNIVERSITY: <FourUniversity />,
  FOUR_YEARS_WORK: <FourWork />,
  FOUR_YEARS_SOCIAL: <FourSocial />,
  FOUR_YEARS_ETC: <FourEtc />,
  INFINITE_ELEMENTARY_SCHOOL: <InfiniteElementary />,
  INFINITE_WORK: <InfiniteWork />,
  INFINITE_SOCIAL: <InfiniteSocial />,
  INFINITE_ETC: <InfiniteEtc />,
  INFINITE_MIDDLE_AND_HIGH_SCHOOL: <InFiniteMiddleHigh />,
  INFINITE_UNIVERSITY: <InfiniteUniversity />,
}

export const flowerCardAsset: Record<AssetKey, ReactNode> = {
  SIX_MONTHS_ELEMENTARY_SCHOOL: <SixElementaryFlower />,
  SIX_MONTHS_MIDDLE_AND_HIGH_SCHOOL: <SixMiddleHighFlower />,
  SIX_MONTHS_UNIVERSITY: <SixUniversityFlower />,
  SIX_MONTHS_WORK: <SixWorkFlower />,
  SIX_MONTHS_SOCIAL: <SixSocialFlower />,
  SIX_MONTHS_ETC: <SixEtcFlower />,
  ONE_YEAR_ELEMENTARY_SCHOOL: <OneElementaryFlower />,
  ONE_YEAR_MIDDLE_AND_HIGH_SCHOOL: <OneMiddleHighFlower />,
  ONE_YEAR_UNIVERSITY: <OneUniversityFlower />,
  ONE_YEAR_WORK: <OneWorkFlower />,
  ONE_YEAR_SOCIAL: <OneSocialFlower />,
  ONE_YEAR_ETC: <OneEtcFlower />,
  FOUR_YEARS_ELEMENTARY_SCHOOL: <FourElementaryFlower />,
  FOUR_YEARS_MIDDLE_AND_HIGH_SCHOOL: <FourMiddleHighFlower />,
  FOUR_YEARS_UNIVERSITY: <FourUniversityFlower />,
  FOUR_YEARS_WORK: <FourWorkFlower />,
  FOUR_YEARS_SOCIAL: <FourSocialFlower />,
  FOUR_YEARS_ETC: <FourEtcFlower />,
  INFINITE_ELEMENTARY_SCHOOL: <InfiniteElementaryFlower />,
  INFINITE_WORK: <InfiniteWorkFlower />,
  INFINITE_SOCIAL: <InfiniteSocialFlower />,
  INFINITE_ETC: <InfiniteEtcFlower />,
  INFINITE_MIDDLE_AND_HIGH_SCHOOL: <InfiniteMiddleHighFlower />,
  INFINITE_UNIVERSITY: <InfiniteUniversityFlower />,
}
