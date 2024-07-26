/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
class EmojiRendererData {
  // eslint-disable-next-line complexity
  static isEmoji(charCode) {
    return charCode > 983041 || charCode < 35
      ? false
      : charCode === 35 ||
          charCode === 42 ||
          (charCode >= 48 && charCode <= 57) ||
          charCode === 169 ||
          charCode === 174 ||
          charCode === 8205 ||
          charCode === 8252 ||
          charCode === 8265 ||
          charCode === 8419 ||
          charCode === 8482 ||
          charCode === 8505 ||
          (charCode >= 8596 && charCode <= 8601) ||
          (charCode >= 8617 && charCode <= 8618) ||
          (charCode >= 8986 && charCode <= 8987) ||
          charCode === 9000 ||
          charCode === 9167 ||
          (charCode >= 9193 && charCode <= 9203) ||
          (charCode >= 9208 && charCode <= 9210) ||
          charCode === 9410 ||
          (charCode >= 9642 && charCode <= 9643) ||
          charCode === 9654 ||
          charCode === 9664 ||
          (charCode >= 9723 && charCode <= 9726) ||
          (charCode >= 9728 && charCode <= 9732) ||
          charCode === 9742 ||
          charCode === 9745 ||
          (charCode >= 9748 && charCode <= 9749) ||
          charCode === 9752 ||
          charCode === 9760 ||
          (charCode >= 9762 && charCode <= 9763) ||
          charCode === 9766 ||
          charCode === 9770 ||
          (charCode >= 9774 && charCode <= 9775) ||
          (charCode >= 9784 && charCode <= 9786) ||
          charCode === 9792 ||
          charCode === 9794 ||
          (charCode >= 9800 && charCode <= 9811) ||
          (charCode >= 9823 && charCode <= 9824) ||
          charCode === 9827 ||
          (charCode >= 9829 && charCode <= 9830) ||
          charCode === 9832 ||
          charCode === 9851 ||
          (charCode >= 9854 && charCode <= 9855) ||
          (charCode >= 9874 && charCode <= 9879) ||
          charCode === 9881 ||
          (charCode >= 9883 && charCode <= 9884) ||
          (charCode >= 9888 && charCode <= 9889) ||
          charCode === 9895 ||
          (charCode >= 9898 && charCode <= 9899) ||
          (charCode >= 9904 && charCode <= 9905) ||
          (charCode >= 9917 && charCode <= 9918) ||
          (charCode >= 9924 && charCode <= 9925) ||
          charCode === 9928 ||
          (charCode >= 9934 && charCode <= 9935) ||
          charCode === 9937 ||
          (charCode >= 9939 && charCode <= 9940) ||
          (charCode >= 9961 && charCode <= 9962) ||
          (charCode >= 9968 && charCode <= 9973) ||
          (charCode >= 9975 && charCode <= 9976) ||
          charCode === 9978 ||
          charCode === 9981 ||
          charCode === 9986 ||
          charCode === 9989 ||
          (charCode >= 9992 && charCode <= 9993) ||
          charCode === 9999 ||
          charCode === 10002 ||
          charCode === 10004 ||
          charCode === 10006 ||
          charCode === 10013 ||
          charCode === 10017 ||
          charCode === 10024 ||
          (charCode >= 10035 && charCode <= 10036) ||
          charCode === 10052 ||
          charCode === 10055 ||
          charCode === 10060 ||
          charCode === 10062 ||
          (charCode >= 10067 && charCode <= 10069) ||
          charCode === 10071 ||
          (charCode >= 10083 && charCode <= 10084) ||
          (charCode >= 10133 && charCode <= 10135) ||
          charCode === 10145 ||
          charCode === 10160 ||
          charCode === 10175 ||
          (charCode >= 10548 && charCode <= 10549) ||
          (charCode >= 11013 && charCode <= 11015) ||
          (charCode >= 11035 && charCode <= 11036) ||
          charCode === 11088 ||
          charCode === 11093 ||
          charCode === 12336 ||
          charCode === 12349 ||
          charCode === 12951 ||
          charCode === 12953 ||
          charCode === 126980 ||
          charCode === 127183 ||
          (charCode >= 127344 && charCode <= 127345) ||
          (charCode >= 127358 && charCode <= 127359) ||
          charCode === 127374 ||
          (charCode >= 127377 && charCode <= 127386) ||
          (charCode >= 127462 && charCode <= 127487) ||
          (charCode >= 127489 && charCode <= 127490) ||
          charCode === 127514 ||
          charCode === 127535 ||
          (charCode >= 127538 && charCode <= 127546) ||
          (charCode >= 127568 && charCode <= 127569) ||
          (charCode >= 127744 && charCode <= 127777) ||
          (charCode >= 127780 && charCode <= 127876) ||
          (charCode >= 127878 && charCode <= 127891) ||
          (charCode >= 127894 && charCode <= 127895) ||
          (charCode >= 127897 && charCode <= 127899) ||
          (charCode >= 127902 && charCode <= 127937) ||
          (charCode >= 127941 && charCode <= 127942) ||
          (charCode >= 127944 && charCode <= 127945) ||
          (charCode >= 127949 && charCode <= 127984) ||
          (charCode >= 127987 && charCode <= 127989) ||
          (charCode >= 127991 && charCode <= 127994) ||
          (charCode >= 128000 && charCode <= 128065) ||
          (charCode >= 128068 && charCode <= 128069) ||
          (charCode >= 128081 && charCode <= 128101) ||
          (charCode >= 128121 && charCode <= 128123) ||
          (charCode >= 128125 && charCode <= 128128) ||
          charCode === 128132 ||
          (charCode >= 128136 && charCode <= 128142) ||
          charCode === 128144 ||
          (charCode >= 128146 && charCode <= 128169) ||
          (charCode >= 128171 && charCode <= 128253) ||
          (charCode >= 128255 && charCode <= 128317) ||
          (charCode >= 128329 && charCode <= 128334) ||
          (charCode >= 128336 && charCode <= 128359) ||
          (charCode >= 128367 && charCode <= 128368) ||
          charCode === 128371 ||
          (charCode >= 128374 && charCode <= 128377) ||
          charCode === 128391 ||
          (charCode >= 128394 && charCode <= 128397) ||
          (charCode >= 128420 && charCode <= 128421) ||
          charCode === 128424 ||
          (charCode >= 128433 && charCode <= 128434) ||
          charCode === 128444 ||
          (charCode >= 128450 && charCode <= 128452) ||
          (charCode >= 128465 && charCode <= 128467) ||
          (charCode >= 128476 && charCode <= 128478) ||
          charCode === 128481 ||
          charCode === 128483 ||
          charCode === 128488 ||
          charCode === 128495 ||
          charCode === 128499 ||
          (charCode >= 128506 && charCode <= 128580) ||
          (charCode >= 128584 && charCode <= 128586) ||
          (charCode >= 128640 && charCode <= 128674) ||
          (charCode >= 128676 && charCode <= 128691) ||
          (charCode >= 128695 && charCode <= 128703) ||
          (charCode >= 128705 && charCode <= 128709) ||
          charCode === 128715 ||
          (charCode >= 128717 && charCode <= 128722) ||
          (charCode >= 128725 && charCode <= 128727) ||
          (charCode >= 128732 && charCode <= 128741) ||
          charCode === 128745 ||
          (charCode >= 128747 && charCode <= 128748) ||
          charCode === 128752 ||
          (charCode >= 128755 && charCode <= 128764) ||
          (charCode >= 128992 && charCode <= 129003) ||
          charCode === 129008 ||
          (charCode >= 129293 && charCode <= 129294) ||
          (charCode >= 129296 && charCode <= 129303) ||
          (charCode >= 129312 && charCode <= 129317) ||
          (charCode >= 129319 && charCode <= 129327) ||
          charCode === 129338 ||
          (charCode >= 129343 && charCode <= 129349) ||
          (charCode >= 129351 && charCode <= 129398) ||
          (charCode >= 129400 && charCode <= 129460) ||
          charCode === 129463 ||
          charCode === 129466 ||
          (charCode >= 129468 && charCode <= 129484) ||
          charCode === 129488 ||
          (charCode >= 129502 && charCode <= 129535) ||
          (charCode >= 129648 && charCode <= 129660) ||
          (charCode >= 129664 && charCode <= 129672) ||
          (charCode >= 129680 && charCode <= 129725) ||
          (charCode >= 129727 && charCode <= 129730) ||
          (charCode >= 129742 && charCode <= 129755) ||
          (charCode >= 129760 && charCode <= 129768) ||
          (charCode >= 917536 && charCode <= 917631) ||
          (charCode >= 983040 && charCode <= 983041);
  }

  static isEmojiModifier(charCode) {
    return charCode >= 127995 && charCode <= 127999;
  }

  // eslint-disable-next-line complexity
  static isEmojiModifierBase(charCode) {
    return (
      charCode === 9757 ||
      charCode === 9977 ||
      (charCode >= 9994 && charCode <= 9997) ||
      charCode === 127877 ||
      (charCode >= 127938 && charCode <= 127940) ||
      charCode === 127943 ||
      (charCode >= 127946 && charCode <= 127948) ||
      (charCode >= 128066 && charCode <= 128067) ||
      (charCode >= 128070 && charCode <= 128080) ||
      (charCode >= 128102 && charCode <= 128120) ||
      charCode === 128124 ||
      (charCode >= 128129 && charCode <= 128131) ||
      (charCode >= 128133 && charCode <= 128135) ||
      charCode === 128143 ||
      charCode === 128145 ||
      charCode === 128170 ||
      (charCode >= 128372 && charCode <= 128373) ||
      charCode === 128378 ||
      charCode === 128400 ||
      (charCode >= 128405 && charCode <= 128406) ||
      (charCode >= 128581 && charCode <= 128583) ||
      (charCode >= 128587 && charCode <= 128591) ||
      charCode === 128675 ||
      (charCode >= 128692 && charCode <= 128694) ||
      charCode === 128704 ||
      charCode === 128716 ||
      charCode === 129292 ||
      charCode === 129295 ||
      (charCode >= 129304 && charCode <= 129311) ||
      charCode === 129318 ||
      (charCode >= 129328 && charCode <= 129337) ||
      (charCode >= 129340 && charCode <= 129342) ||
      charCode === 129399 ||
      (charCode >= 129461 && charCode <= 129462) ||
      (charCode >= 129464 && charCode <= 129465) ||
      charCode === 129467 ||
      (charCode >= 129485 && charCode <= 129487) ||
      (charCode >= 129489 && charCode <= 129501) ||
      (charCode >= 129731 && charCode <= 129733) ||
      (charCode >= 129776 && charCode <= 129784)
    );
  }

  static isEmojiVariationSelector(charCode) {
    return charCode === 65039;
  }

  static isNonSpacingCombiningMark(charCode) {
    return charCode === 8416 || charCode === 8419;
  }

  static isRegionalIndicator(charCode) {
    return charCode >= 127462 && charCode <= 127487;
  }

  static isTagSpec(charCode) {
    return (
      (charCode >= 917536 && charCode <= 917568) ||
      (charCode >= 917595 && charCode <= 917630)
    );
  }

  static isTagTerm(charCode) {
    return charCode === 917631;
  }

  static isText(charCode) {
    return (
      charCode === 35 ||
      charCode === 42 ||
      (charCode >= 48 && charCode <= 57) ||
      charCode === 8419
    );
  }

  static isTextVariationSelector(charCode) {
    return charCode === 65038;
  }

  // eslint-disable-next-line complexity
  static isDefaultTextPresentation(charCode) {
    return (
      charCode === 35 ||
      charCode === 42 ||
      (charCode >= 48 && charCode <= 57) ||
      charCode === 169 ||
      charCode === 174 ||
      charCode === 8205 ||
      charCode === 8252 ||
      charCode === 8265 ||
      charCode === 8419 ||
      charCode === 8482 ||
      charCode === 8505 ||
      (charCode >= 8596 && charCode <= 8597) ||
      (charCode >= 8617 && charCode <= 8618) ||
      charCode === 9000 ||
      charCode === 9167 ||
      (charCode >= 9197 && charCode <= 9199) ||
      (charCode >= 9201 && charCode <= 9202) ||
      (charCode >= 9208 && charCode <= 9210) ||
      charCode === 9410 ||
      charCode === 9654 ||
      charCode === 9664 ||
      (charCode >= 9730 && charCode <= 9732) ||
      charCode === 9745 ||
      charCode === 9752 ||
      charCode === 9760 ||
      (charCode >= 9762 && charCode <= 9763) ||
      charCode === 9766 ||
      charCode === 9770 ||
      (charCode >= 9774 && charCode <= 9775) ||
      (charCode >= 9784 && charCode <= 9785) ||
      charCode === 9792 ||
      charCode === 9794 ||
      charCode === 9823 ||
      charCode === 9851 ||
      charCode === 9854 ||
      charCode === 9874 ||
      (charCode >= 9876 && charCode <= 9879) ||
      charCode === 9881 ||
      (charCode >= 9883 && charCode <= 9884) ||
      charCode === 9895 ||
      (charCode >= 9904 && charCode <= 9905) ||
      charCode === 9928 ||
      charCode === 9935 ||
      charCode === 9937 ||
      charCode === 9939 ||
      charCode === 9961 ||
      (charCode >= 9968 && charCode <= 9969) ||
      charCode === 9972 ||
      (charCode >= 9975 && charCode <= 9977) ||
      charCode === 9997 ||
      charCode === 9999 ||
      charCode === 10002 ||
      charCode === 10004 ||
      charCode === 10013 ||
      charCode === 10017 ||
      charCode === 10052 ||
      charCode === 10055 ||
      charCode === 10083 ||
      charCode === 12336 ||
      (charCode >= 127344 && charCode <= 127345) ||
      (charCode >= 127358 && charCode <= 127359) ||
      charCode === 127777 ||
      (charCode >= 127780 && charCode <= 127788) ||
      charCode === 127798 ||
      charCode === 127869 ||
      (charCode >= 127894 && charCode <= 127895) ||
      (charCode >= 127897 && charCode <= 127899) ||
      (charCode >= 127902 && charCode <= 127903) ||
      (charCode >= 127947 && charCode <= 127950) ||
      (charCode >= 127956 && charCode <= 127967) ||
      charCode === 127987 ||
      charCode === 127989 ||
      charCode === 127991 ||
      charCode === 128063 ||
      charCode === 128065 ||
      charCode === 128253 ||
      (charCode >= 128329 && charCode <= 128330) ||
      (charCode >= 128367 && charCode <= 128368) ||
      charCode === 128371 ||
      (charCode >= 128374 && charCode <= 128377) ||
      charCode === 128391 ||
      (charCode >= 128394 && charCode <= 128397) ||
      charCode === 128400 ||
      charCode === 128421 ||
      charCode === 128424 ||
      (charCode >= 128433 && charCode <= 128434) ||
      charCode === 128444 ||
      (charCode >= 128450 && charCode <= 128452) ||
      (charCode >= 128465 && charCode <= 128467) ||
      (charCode >= 128476 && charCode <= 128478) ||
      charCode === 128481 ||
      charCode === 128483 ||
      charCode === 128488 ||
      charCode === 128495 ||
      charCode === 128499 ||
      charCode === 128506 ||
      charCode === 128715 ||
      (charCode >= 128717 && charCode <= 128719) ||
      (charCode >= 128736 && charCode <= 128741) ||
      charCode === 128745 ||
      charCode === 128752 ||
      charCode === 128755 ||
      (charCode >= 917536 && charCode <= 917631)
    );
  }

  static isSymbol(charCode) {
    return charCode === 169 || charCode === 174 || charCode === 8482;
  }

  static isZWJ(charCode) {
    return charCode === 8205;
  }
}

export default EmojiRendererData;
