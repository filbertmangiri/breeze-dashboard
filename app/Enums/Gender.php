<?php declare (strict_types = 1);

namespace App\Enums;

use BenSampo\Enum\Attributes\Description;
use BenSampo\Enum\Enum;

/**
 * @method static static Male()
 * @method static static Female()
 */
final class Gender extends Enum
{
    #[Description('Male')]
    const Male = 'male';

    #[Description('Female')]
    const Female = 'female';
}
