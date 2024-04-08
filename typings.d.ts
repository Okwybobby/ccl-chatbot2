interface Message{
    text: string;
    createdAt: AppBuildManifest.firstore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}