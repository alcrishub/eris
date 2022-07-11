const randomHexColor = require("../util/utils");
const checkType = require("../util/utils");

/**
 * @source https://github.com/excilone/aderis
 */
class EmbedConstructor {
    author;
    color;
    description;
    fields;
    footer;
    image;
    thumbnail;
    timestamp;
    title;
    url;
    constructor(data = {}) {
        Object.assign(this, data);
    }

    setTitle(title) {
        this.title = checkType(title, 'STRING', {
            maxLength: EmbedConstructor.MAX_TITLE_LENGTH
        });
        if (this.title.length < 1) this.title = undefined;
        return this;
    }

    setDescription(description) {
        this.description = checkType(description, 'STRING', {
            maxLength: EmbedConstructor.MAX_DESCRIPTION_LENGTH
        });
        if (this.description.length < 1) this.description = undefined;
        return this;
    }

    setURL(url) {
        this.url = checkType(url, 'STRING');
        return this;
    }

    setTimestamp(timestamp) {
        this.timestamp = new Date(timestamp);
        return this;
    }

    setColor(color, g, b) {
        if (arguments.length === 1 && typeof color === 'number') this.color = color;
        else if (typeof color === 'string' && color.toUpperCase() === 'RANDOM') {
            this.color = randomHexColor();
        } else if (typeof color === 'string' && color.toUpperCase() === 'AQUA') {
            this.color = Number(0x1ABC9C)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_AQUA') {
            this.color = Number(0x11806A)
        } else if (typeof color === 'string' && color.toUpperCase() === 'GREEN') {
            this.color = Number(0x2ECC71)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_GREEN') {
            this.color = Number(0x1F8B4C)
        } else if (typeof color === 'string' && color.toUpperCase() === 'BLUE') {
            this.color = Number(0x3498DB)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_BLUE') {
            this.color = Number(0x206694)
        } else if (typeof color === 'string' && color.toUpperCase() === 'PURPLE') {
            this.color = Number(0x9B59B6)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_PURPLE') {
            this.color = Number(0x71368A)
        } else if (typeof color === 'string' && color.toUpperCase() === 'LUMINOUS_VIVID_PINK') {
            this.color = Number(0xE91E63)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_VIVID_PINK') {
            this.color = Number(0xAD1457)
        } else if (typeof color === 'string' && color.toUpperCase() === 'GOLD') {
            this.color = Number(0xF1C40F)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_GOLD') {
            this.color = Number(0xC27C0E)
        } else if (typeof color === 'string' && color.toUpperCase() === 'ORANGE') {
            this.color = Number(0xE67E22)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_ORANGE') {
            this.color = Number(0xA84300)
        } else if (typeof color === 'string' && color.toUpperCase() === 'RED') {
            this.color = Number(0xE74C3C)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_RED') {
            this.color = Number(0x992D22)
        } else if (typeof color === 'string' && color.toUpperCase() === 'GREY') {
            this.color = Number(0x95A5A6)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_GREY') {
            this.color = Number(0x979C9F)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARKER_GREY') {
            this.color = Number(0x7F8C8D)
        } else if (typeof color === 'string' && color.toUpperCase() === 'LIGHT_GREY') {
            this.color = Number(0xBCC0C0)
        } else if (typeof color === 'string' && color.toUpperCase() === 'NAVY') {
            this.color = Number(0x34495E)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_NAVY') {
            this.color = Number(0x2C3E50)
        } else if (typeof color === 'string' && color.toUpperCase() === 'YELLOW') {
            this.color = Number(0xFFFF00)
        } else if (typeof color === 'string' && color.toUpperCase() === 'WHITE') {
            this.color = Number(0xFFFFFF)
        } else if (typeof color === 'string' && color.toUpperCase() === 'BLURPLE') {
            this.color = Number(0x5865F2)
        } else if (typeof color === 'string' && color.toUpperCase() === 'GREYPLE') {
            this.color = Number(0x99AAB5)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_BUT_NOT_BLACK') {
            this.color = Number(0x2C2F33)
        } else if (typeof color === 'string' && color.toUpperCase() === 'NOT_QUITE_BLACK') {
            this.color = Number(0x23272A)
        } else if (typeof color === 'string' && color.toUpperCase() === 'FUSCHIA') {
            this.color = Number(0xEB459E)
        } else if (typeof color === 'string' && color.toUpperCase() === 'BLACK') {
            this.color = Number(0x23272A)
        } else if (typeof color === 'string' && color.toUpperCase() === 'DARK_THEME_BACKGROUND') {
            this.color = Number(0x36393F)
        } else if (typeof color === 'string' && color.startsWith('#')) {
            checkType(color, 'STRING', {
                match: /#[ABCDEF1234567890]{6}/g
            });
            this.color = Number(color.replace('#', '0x'));
        } else if (typeof color === 'number' &&
            typeof g === 'number' &&
            typeof b === 'number') {
            const colors = [color, g, b];
            for (const c of colors.values()) {
                checkType(c, 'NUMBER', {
                    integer: true,
                    max: 255,
                    min: 0
                });
            }
            this.color = (colors[0] << 16) + (colors[1] << 8) + colors[2];
        } else throw new TypeError('Invalid Embed color.');
        return this;
    }

    setFooter(footer, iconURL) {
        this.footer =
            typeof footer === 'string'
                ? {
                    text: checkType(footer, 'STRING', {
                        maxLength: EmbedConstructor.MAX_FOOTER_TEXT_LENGTH
                    }),
                    icon_url: iconURL ?? this.footer?.icon_url
                }
                : {
                    text: checkType(footer.text, 'STRING', {
                        maxLength: EmbedConstructor.MAX_FOOTER_TEXT_LENGTH
                    }),
                    icon_url: footer.icon_url ?? this.footer?.icon_url
                };
        if (this.footer?.text.length < 1) this.footer = undefined;
        else if (this.footer?.icon_url !== undefined && this.footer?.icon_url.length < 1)
            this.footer.icon_url = undefined;
        return this;
    }

    setImage(image) {
        this.image = typeof image === 'string' ? { url: image } : image;
        return this;
    }

    setThumbnail(thumbnail) {
        this.thumbnail = typeof thumbnail === 'string' ? { url: thumbnail } : thumbnail;
        return this;
    }

    setAuthor(author, icon_url, url) {
        this.author =
            typeof author === 'string'
                ? {
                    name: checkType(author, 'STRING', {
                        maxLength: EmbedConstructor.MAX_AUTHOR_NAME_LENGTH
                    }),
                    icon_url,
                    url
                }
                : {
                    name: checkType(author.name, 'STRING', {
                        maxLength: EmbedConstructor.MAX_AUTHOR_NAME_LENGTH
                    }),
                    icon_url: author.icon_url ?? this.author?.icon_url,
                    url: author.url ?? this.author?.url
                };
        return this;
    }

    setFields(fields) {
        this.fields = fields;
        return this;
    }

    addField(field, value, inline) {
        if (typeof field === 'string' && value === undefined)
            throw new Error('Embed field value is required.');
        return this.addFields(typeof field === 'string'
            ? {
                name: field,
                value: value,
                inline
            }
            : field);
    }

    addFields(...fields) {
        const _fields = this.fields ?? [];
        for (const field of fields.values()) {
            if (Array.isArray(field))
                _fields.push(...field.values());
            else
                _fields.push(field);
        }
        return this.setFields(_fields);
    }
    
    toJSON() {
        return {
            author: this.author,
            image: this.image,
            color: this.color,
            description: this.description,
            fields: this.fields
                ?.filter((field) => field.name.length !== 0 && field.value.length !== 0)
                .map((field) => {
                return {
                    name: checkType(field.name, 'STRING', {
                        maxLength: EmbedConstructor.MAX_FIELD_NAME_LENGTH
                    }),
                    value: checkType(field.name, 'STRING', {
                        maxLength: EmbedConstructor.MAX_FIELD_VALUE_LENGTH
                    }),
                    inline: field.inline
                };
            }),
            footer: this.footer,
            thumbnail: this.thumbnail,
            timestamp: this.timestamp,
            title: this.title,
            url: this.url
        };
    }

    static MAX_TITLE_LENGTH = 256;
	static MAX_DESCRIPTION_LENGTH = 4096;
	static MAX_FIELD_NAME_LENGTH = 256;
	static MAX_FIELD_VALUE_LENGTH = 1024;
	static MAX_FIELDS_LENGTH = 25;
	static MAX_FOOTER_TEXT_LENGTH = 2048;
	static MAX_AUTHOR_NAME_LENGTH = 256;
}

module.exports = EmbedConstructor