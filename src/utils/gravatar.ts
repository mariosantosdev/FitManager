export default function GenerateAvatar(seed: string) {
    const API_URI = 'https://avatars.dicebear.com/api';
    const sprites = 'micah'
    const format = 'png';

    return `${API_URI}/${sprites}/${seed}.${format}`;
}