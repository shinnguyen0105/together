import {Image, StyleSheet, Platform, TouchableOpacity, StatusBar, Text, FlatList, View} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import React, {useState} from "react";
import {CommonIcon} from "@/components/navigation/CommonIcon";

export default function ReminderScreen() {

    const [selectedId, setSelectedId] = useState<string| undefined>();

    const renderItems = ({item}: { item: ItemData }) => {

        const backgroundColor = item.id === selectedId
            ? styles.circleSelected.backgroundColor
            : styles.circle.backgroundColor;

        function onPressSelectItem(id: string) {
            if (selectedId == id) {
                setSelectedId(undefined)
            } else {
                setSelectedId(id)
            }
        }
        return (
            <ListReminderItem
                item={item}
                onPress={() => onPressSelectItem(item.id)}
                backgroundColor={backgroundColor}
            />
        );
    };

    return (
        <View style={styles.container}>
            <ParallaxScrollView
                headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
                headerImage={
                <></>
                }>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText type="title">Welcome</ThemedText>
                    <HelloWave/>
                </ThemedView>

                <ThemedView style={styles.stepContainer}>
                    <ThemedText type="subtitle">Nhắc nhở</ThemedText>
                    <FlatList
                        data={reminders}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItems}
                    />
                </ThemedView>
            </ParallaxScrollView>
            <TouchableOpacity style={styles.addButton}>
                <CommonIcon name={'add-circle'} color={'#0a7ea4'} />
                <Text style={styles.addButtonText}>Lời nhắc mới</Text>
            </TouchableOpacity>
        </View>

    );
}

const ListReminderItem = ({item, onPress, backgroundColor}: ItemProps) => (
    <ThemedView style={styles.reminderContainer}>
        <TouchableOpacity style={[styles.circle, {backgroundColor}]} onPress={onPress}/>
        <ThemedView style={styles.reminderTextContainer}>
            <ThemedText style={styles.reminderTitle}>{item.title}</ThemedText>
            <ThemedText style={styles.reminderSubtitle}>
                {item.date}{item.repeat ? `, ${item.repeat}`: ''}
            </ThemedText>
        </ThemedView>
        <TouchableOpacity style={styles.infoIcon}>
            <CommonIcon name="information-circle-outline" size={24} color="#888" />
        </TouchableOpacity>
    </ThemedView>

);

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    reminderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#d3d3d3',
        marginRight: 10,
        backgroundColor: '#ffffff',
    },
    circleSelected: {
        backgroundColor: '#0a7ea4',
    },
    reminderTextContainer: {
        flex: 1,
    },
    reminderTitle: {
        fontSize: 16,
        color: '#000',
    },
    reminderSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 16,
        color: '#0a7ea4',
        marginLeft: 5,
    },
    infoIcon: {
        marginLeft: 10,
    },
});

type ItemData = {
    id: string;
    title: string;
    date: string;
    repeat?: string;
};

const reminders: ItemData[] = [
    {id: '1', title: 'Nhắc tiền ytb', date: '21/11/24', repeat: 'Hàng tháng'},
    {id: '2', title: 'Ssssssssaaa', date: '16:00 Hôm nay'},
];

type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
};