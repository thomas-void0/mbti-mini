
import { floor } from 'lodash-es'

type Num = number | string | undefined | null
const ONE_HUNDRED_MILLION = 100000000 as const
const TEN_THOUSAND = 10000 as const
const ONE_THOUSAND = 1000 as const
const TRILLION = ONE_HUNDRED_MILLION * 10000
/**
 * 将数字转换为带单位的格式
 *
 * @param {string | number} _num 要转换的值
 * @param {number} len 保留小数的位数 默认两位 会去掉小数点后面的0
 */
export function countUnit(num: Num, len = 2, isK = false) {
	if (num === undefined || num === null) return num

	if (typeof num === 'string') {
		// 匹配空字符和非数字字符
		if (!/^-?\d+(\.\d+)?$/.test(num)) {
			return num
		}

		// eslint-disable-next-line no-param-reassign
		num = Number(num)
	}

	// 大于一万亿
	if (num >= TRILLION) {
		return `${floor(num / TRILLION, len)}万亿`
	}

	// 大于一亿
	if (num >= ONE_HUNDRED_MILLION) {
		return `${floor(num / ONE_HUNDRED_MILLION, len)}亿`
	}

	// 大于1万
	if (num >= TEN_THOUSAND) {
		return `${floor(num / TEN_THOUSAND, len)}w`
	}

	// 大于1千
	if (isK && num >= ONE_THOUSAND) {
		return `${floor(num / ONE_THOUSAND, len)}k`
	}

	// 小于负一亿
	if (num <= -ONE_HUNDRED_MILLION) {
		return `${floor(num / ONE_HUNDRED_MILLION, len)}亿`
	}

	// 小于负1万
	if (num <= -TEN_THOUSAND) {
		return `${floor(num / TEN_THOUSAND, len)}w`
	}

	return floor(num, len)
}
